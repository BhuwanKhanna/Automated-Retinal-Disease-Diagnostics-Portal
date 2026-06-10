# Mini Project Report: Automated Retinal Disease Diagnostics Portal

## 1. Abstract
Diabetic Retinopathy (DR) is a leading cause of vision impairment globally. Early detection is critical for effective treatment. This project develops an automated portal that leverages Deep Learning to analyze retinal fundus images and categorize them into different stages of DR severity. Built with FastAPI and React, the portal provides a user-friendly interface for doctors to upload scans and receive instant diagnostic support with a high confidence score.

## 2. Objectives
- To develop a deep learning model for classifying retinal fundus images.
- To build a responsive, modern web interface for image upload and result visualization.
- To provide a clear explanation for the diagnosis results based on medical indicators.
- To demonstrate the application of Transfer Learning in medical image processing.

## 3. Methodology
### 3.1 Data Preprocessing
Images are resized to 224x224 pixels and normalized using standard ImageNet mean and variance to match the input requirements of the MobileNetV2 architecture. Data augmentation techniques like rotation and flipping are integrated into the training pipeline.

### 3.2 Deep Learning Model
We utilize **Transfer Learning** with the **MobileNetV2** architecture. The base model is pre-trained on the ImageNet dataset, and its final layers are replaced with a global average pooling layer and a dense classification head tailored for 4 classes: Healthy, Mild DR, Moderate DR, and Severe DR.

### 3.3 Backend Architecture
The backend is built using **FastAPI**, which handles the REST API endpoints. It manages image uploads securely, runs the inference session using TensorFlow, and returns the prediction and confidence score as JSON data.

### 3.4 Frontend Architecture
The frontend is built with **React.js** and **Vite**, focusing on a clean, glassmorphic medical UI design. It handles state management for image previews, API calls, and local storage-based history.

## 4. Tools Used
- **Programming Language**: Python 3.13, JavaScript (ES6+).
- **Frameworks**: FastAPI (Backend), React (Frontend).
- **Libraries**: TensorFlow, Keras, NumPy, Pillow, Lucide Icons.
- **Styling**: Vanilla CSS with Glassmorphism.
- **Tools**: Vite, local storage for history tracking.

## 5. Future Scope
- **Ensemble Learning**: Combining Multiple CNN architectures (ResNet50 + EfficientNet) for better accuracy.
- **Cloud Integration**: Deploying the model on AWS/GCP for global accessibility.
- **Report Generation**: Generating downloadable PDF reports for patients.
- **Multi-Disease Detection**: Extending the model to detect Glaucoma and Macular Degeneration.

## 6. Conclusion
The Automated Retinal Disease Diagnostics Portal serves as a robust proof-of-concept for AI in healthcare. It achieves its objective by providing a seamless, accurate, and educational tool for assistive diagnosis.

---
**Submitted by:** B.Tech 4th Semester Student
**Submission Date:** April 2026
