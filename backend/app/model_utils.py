import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Classes mapping
CLASS_NAMES = ["Healthy", "Mild DR", "Moderate DR", "Severe DR"]
EXPLANATIONS = {
    "Healthy": "No visible signs of diabetic retinopathy were detected in the retinal scan.",
    "Mild DR": "Small areas of swelling in the retina's blood vessels (microaneurysms) are present.",
    "Moderate DR": "Blood vessels that nourish the retina may swell and become distorted. They may also lose their ability to transport blood.",
    "Severe DR": "Many more blood vessels are blocked, depriving several areas of the retina with their blood supply. High risk of vision loss.",
}

# Global model variable
model = None

def load_dr_model():
    global model
    model_path = os.path.join(os.path.dirname(__file__), "..", "models", "dr_model.h5")
    if not os.path.exists(model_path):
        print(f"Warning: Model file not found at {model_path}. Run prepare_model.py first.")
        # In a real scenario, we'd handle this more gracefully
        return False
    
    try:
        model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully.")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

def predict_retinal_disease(image_path):
    global model
    if model is None:
        if not load_dr_model():
            # Return a mock prediction if model fails for demo purposes
            # (Remove this fallback for production)
            return {
                "prediction": "Moderate DR (Demo Mode)",
                "confidence": "85.5%",
                "explanation": "Note: Model not loaded correctly. This is a placeholder result for UI testing."
            }

    try:
        # Load and preprocess image
        img = Image.open(image_path).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)

        # Predict
        predictions = model.predict(img_array)
        class_idx = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0])) * 100

        return {
            "prediction": CLASS_NAMES[class_idx],
            "confidence": f"{confidence:.2f}%",
            "explanation": EXPLANATIONS[CLASS_NAMES[class_idx]]
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        return {"error": str(e)}
