import os
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def create_demo_model():
    print("Setting up Pre-trained MobileNetV2 for Diabetic Retinopathy detection...")
    
    # Base model with weights from ImageNet
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    # Custom layers for our 4 classes
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(512, activation='relu')(x)
    predictions = Dense(4, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Ensure directory exists
    model_path = os.path.join('..', 'backend', 'models')
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    
    save_path = os.path.join(model_path, 'dr_model.h5')
    print(f"Saving model to {save_path}...")
    model.save(save_path)
    print("Model initialized successfully!")

if __name__ == "__main__":
    create_demo_model()
