# RetinaScan AI: Automated Retinal Disease Diagnostics Portal

A complete web-based AI portal developed for detecting Diabetic Retinopathy from retinal fundus images. This project utilizes Deep Learning (Transfer Learning with MobileNetV2) and a modern full-stack architecture (FastAPI + React).

## 🚀 Quick Start (Windows)

1. **Initialize the Model**:
   ```powershell
   cd data_scripts
   python prepare_model.py
   ```

2. **Run the Portal**:
   Double-click the `run.bat` file in the root directory.
   - Backend will start at: `http://localhost:8000`
   - Frontend will start at: `http://localhost:5173`

---

## 🛠️ Features
- **AI-Powered Analysis**: Detects Healthy, Mild, Moderate, and Severe Diabetic Retinopathy.
- **Modern UI**: Dark-themed, glassmorphic medical dashboard with sleek animations.
- **Drag & Drop**: Seamless image upload and preview.
- **History Tracking**: Keeps a log of your recent 5 scans in the browser.
- **Instant Explanation**: Provides medical context for every diagnosis result.

---

## 📁 Project Structure
- `/backend`: FastAPI server, AI inference logic, and model storage.
- `/frontend`: React application with Vite, built with modern CSS.
- `/data_scripts`: Scripts for model preparation and data handling.
- `/docs`: Project report and submission documents.

---

## 👩‍💻 Tech Stack
- **AI/ML**: Python, TensorFlow, Keras, MobileNetV2.
- **Backend**: FastAPI, Uvicorn, Pillow, NumPy.
- **Frontend**: React.js, Vite, Lucide Icons, Glassmorphic CSS.

---

## 📜 Disclaimer
**For Educational Purposes Only.** This system is a proof-of-concept for a B.Tech mini project and should not be used for actual clinical medical diagnosis.
