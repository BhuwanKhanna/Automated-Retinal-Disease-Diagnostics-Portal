from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
import uuid
from .model_utils import predict_retinal_disease, load_dr_model

app = FastAPI(title="Retinal Disease Diagnostics API")

# Setup CORS so React can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.on_event("startup")
async def startup_event():
    # Load the model on startup to speed up first request
    load_dr_model()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Retinal Diagnostics API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    # Save file temporarily
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Run inference
        result = predict_retinal_disease(file_path)
        
        # Add metadata
        result["filename"] = file.filename
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup: Remove file after processing (optional, depends on if you want to keep history)
        # For this project, we'll keep it simple and clean up
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
