export const diseases = [
  {
    id: 'heart',
    name: 'Heart Disease',
    description: 'Assess probability based on cardiovascular metrics and medical history.',
    icon: 'Heart',
    features: [
      { name: 'age', label: 'Age', type: 'number', min: 1, max: 120, default: 45 },
      { name: 'sex', label: 'Sex', type: 'select', options: [{label: 'Male', value: 1}, {label: 'Female', value: 0}], default: 1 },
      { name: 'cp', label: 'Chest Pain Type', type: 'select', options: [
        {label: 'Typical Angina', value: 1},
        {label: 'Atypical Angina', value: 2},
        {label: 'Non-anginal Pain', value: 3},
        {label: 'Asymptomatic', value: 4}
      ], default: 1 },
      { name: 'trestbps', label: 'Resting Blood Pressure (mm Hg)', type: 'number', min: 80, max: 200, default: 120 },
      { name: 'chol', label: 'Serum Cholestoral (mg/dl)', type: 'number', min: 100, max: 600, default: 200 },
      { name: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dl', type: 'select', options: [{label: 'True', value: 1}, {label: 'False', value: 0}], default: 0 },
      { name: 'restecg', label: 'Resting ECG Results', type: 'select', options: [
        {label: 'Normal', value: 0},
        {label: 'ST-T Wave Abnormality', value: 1},
        {label: 'Left Ventricular Hypertrophy', value: 2}
      ], default: 0 },
      { name: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', min: 60, max: 220, default: 150 },
      { name: 'exang', label: 'Exercise Induced Angina', type: 'select', options: [{label: 'Yes', value: 1}, {label: 'No', value: 0}], default: 0 },
      { name: 'oldpeak', label: 'ST Depression', type: 'number', min: 0, max: 6, step: 0.1, default: 0 },
      { name: 'slope', label: 'Slope of Peak Exercise ST', type: 'select', options: [{label: 'Upsloping', value: 1}, {label: 'Flat', value: 2}, {label: 'Downsloping', value: 3}], default: 1 },
      { name: 'ca', label: 'Major Vessels (0-3)', type: 'number', min: 0, max: 3, default: 0 },
      { name: 'thal', label: 'Thalassemia', type: 'select', options: [{label: 'Normal', value: 3}, {label: 'Fixed Defect', value: 6}, {label: 'Reversable Defect', value: 7}], default: 3 }
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Predict diabetes risk using glucose levels, BMI, and family history.',
    icon: 'Activity',
    features: [
      { name: 'pregnancies', label: 'Pregnancies', type: 'number', min: 0, max: 20, default: 0 },
      { name: 'glucose', label: 'Glucose Level', type: 'number', min: 0, max: 300, default: 100 },
      { name: 'blood_pressure', label: 'Blood Pressure', type: 'number', min: 0, max: 200, default: 70 },
      { name: 'skin_thickness', label: 'Skin Thickness', type: 'number', min: 0, max: 100, default: 20 },
      { name: 'insulin', label: 'Insulin Level', type: 'number', min: 0, max: 900, default: 80 },
      { name: 'bmi', label: 'BMI', type: 'number', min: 0, max: 70, step: 0.1, default: 25 },
      { name: 'dpf', label: 'Diabetes Pedigree Function', type: 'number', min: 0, max: 3, step: 0.001, default: 0.5 },
      { name: 'age', label: 'Age', type: 'number', min: 1, max: 120, default: 30 }
    ]
  },
  {
    id: 'cancer',
    name: 'Breast Cancer',
    description: 'Evaluate probability of malignancy based on cell nucleus characteristics.',
    icon: 'ShieldAlert',
    features: [
      { name: 'radius_mean', label: 'Radius Mean', type: 'number', default: 14 },
      { name: 'texture_mean', label: 'Texture Mean', type: 'number', default: 19 },
      { name: 'perimeter_mean', label: 'Perimeter Mean', type: 'number', default: 92 },
      { name: 'area_mean', label: 'Area Mean', type: 'number', default: 650 },
      { name: 'smoothness_mean', label: 'Smoothness Mean', type: 'number', step: 0.001, default: 0.1 },
      { name: 'compactness_mean', label: 'Compactness Mean', type: 'number', step: 0.001, default: 0.1 },
      { name: 'concavity_mean', label: 'Concavity Mean', type: 'number', step: 0.001, default: 0.1 },
      { name: 'concave_points_mean', label: 'Concave Points Mean', type: 'number', step: 0.001, default: 0.05 },
      { name: 'symmetry_mean', label: 'Symmetry Mean', type: 'number', step: 0.001, default: 0.18 },
      { name: 'fractal_dimension_mean', label: 'Fractal Dimension Mean', type: 'number', step: 0.001, default: 0.06 }
      // Simplifying to first 10 features for UI, but backend expects 30.
      // We will pad the rest in the form submission.
    ]
  }
];
