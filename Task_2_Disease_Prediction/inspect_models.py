import pickle
import os

MODELS_DIR = '/Users/deepak/Desktop/Disease_prediction_project/backend/models'

for f in os.listdir(MODELS_DIR):
    if f.endswith('_model.pkl'):
        with open(os.path.join(MODELS_DIR, f), 'rb') as m_file:
            model = pickle.load(m_file)
            # Try to get feature count
            try:
                if hasattr(model, 'n_features_in_'):
                    print(f"{f}: {model.n_features_in_} features")
                elif hasattr(model, 'feature_importances_'):
                    print(f"{f}: {len(model.feature_importances_)} features")
                else:
                    print(f"{f}: unknown features")
            except:
                print(f"{f}: could not determine features")
