import os
import pickle
import pandas as pd
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from ucimlrepo import fetch_ucirepo
from sklearn.impute import SimpleImputer
import warnings
warnings.filterwarnings("ignore")

MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend', 'models'))
os.makedirs(MODELS_DIR, exist_ok=True)

def train_and_save(X, y, dataset_name):
    print(f"--- Training models for {dataset_name} ---")
    
    # Handle missing values if any
    imputer = SimpleImputer(strategy='median')
    X_imputed = imputer.fit_transform(X)
    
    X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    models = {
        'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
        'SVM': SVC(probability=True, random_state=42),
        'Random Forest': RandomForestClassifier(random_state=42)
    }
    
    best_model = None
    best_acc = 0
    best_name = ""
    
    for name, model in models.items():
        model.fit(X_train_scaled, y_train)
        preds = model.predict(X_test_scaled)
        acc = accuracy_score(y_test, preds)
        print(f"{name} Accuracy: {acc:.4f}")
        if acc > best_acc:
            best_acc = acc
            best_model = model
            best_name = name
            
    print(f"Best model for {dataset_name}: {best_name} (Acc: {best_acc:.4f})")
    
    # Save best model and scaler
    model_path = os.path.join(MODELS_DIR, f"{dataset_name}_model.pkl")
    scaler_path = os.path.join(MODELS_DIR, f"{dataset_name}_scaler.pkl")
    
    with open(model_path, 'wb') as f:
        pickle.dump(best_model, f)
    with open(scaler_path, 'wb') as f:
        pickle.dump(scaler, f)
    
    print(f"Saved {dataset_name} model and scaler.\n")

def process_breast_cancer():
    data = load_breast_cancer()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target
    train_and_save(X, y, 'cancer')

def process_heart_disease():
    # fetch dataset from ucimlrepo
    heart_disease = fetch_ucirepo(id=45) 
    X = heart_disease.data.features 
    y = heart_disease.data.targets 
    
    # y contains 0 for no disease, 1-4 for disease. Convert to binary 0/1
    y = y.iloc[:, 0].apply(lambda x: 1 if x > 0 else 0)
    train_and_save(X, y, 'heart')

def process_diabetes():
    # Pima Indians Diabetes Dataset from UCI (id 52) isn't directly available via fetch_ucirepo sometimes, 
    # but let's try fetch_ucirepo(id=52) or we use fetch_openml. 
    # To be safe and since fetch_openml is reliable for Pima:
    from sklearn.datasets import fetch_openml
    diabetes = fetch_openml(name='diabetes', version=1, as_frame=True, parser='auto')
    X = diabetes.data
    y = diabetes.target
    # y is 'tested_negative', 'tested_positive'. Convert to 0, 1
    y = y.apply(lambda x: 1 if x == 'tested_positive' else 0)
    train_and_save(X, y, 'diabetes')

if __name__ == "__main__":
    process_breast_cancer()
    process_heart_disease()
    process_diabetes()
    print("All models trained and saved successfully.")
