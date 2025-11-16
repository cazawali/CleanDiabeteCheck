from flask import Flask, request, jsonify
from flask_cors import CORS
import lightgbm as lgb
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)  

# Charger le modèle entraîné LightGBM sauvegardé (best_model.pkl)
with open('Modele/best_model.pkl', 'rb') as f:
    model = pickle.load(f)


features = [
    'gender',
    'age',
    'hypertension',
    'heart_disease',
    'smoking_history',
    'bmi',
    'HbA1c_level',
    'blood_glucose_level'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Vérifier que toutes les features sont présentes
    if not all(feature in data for feature in features):
        return jsonify({'error': 'Données incomplètes'}), 400

    # Extraire les données dans le bon ordre et les convertir en array numpy
    X = np.array([[data[feature] for feature in features]])

    # Prédiction probabilité de diabète (classe 1)
    proba = model.predict_proba(X)[0][1]

    # Seuil de décision (par exemple 0.5)
    seuil = 0.5
    prediction = int(proba >= seuil)

    # Réponse JSON
    return jsonify({
        'probability': round(proba, 3),
        'prediction': 'DIABETIQUE' if prediction == 1 else 'NON DIABETIQUE'
    })

if __name__ == '__main__':
    app.run(debug=True)
