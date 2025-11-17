import { Injectable, signal } from '@angular/core';

export type Lang = 'fr' | 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  currentLang = signal<Lang>(this.getSavedLang());

  private dict: Record<Lang, Record<string, string>> = {
    fr: {
      nav_accueil: 'Accueil',
      nav_prediction: 'Prédiction',
      nav_conseils: 'Conseils',
      nav_regimes: 'Régimes',
      nav_apropos: 'À propos',
      nav_connexion: 'Se connecter',
      nav_bonjour: 'Bonjour',
      confirm_logout: 'Voulez-vous vous déconnecter ?',

      pageheader_titre: 'Test de Prédiction du Diabète',
      pageheader_desc: 'Remplissez le formulaire ci-dessous pour obtenir une évaluation de vos risques',

      form_medical_titre: '📊 Informations Médicales',
      form_medical_desc: 'Veuillez remplir tous les champs avec précision',

      label_gender: 'Genre :',
      option_gender_select: 'Sélectionner',
      option_gender_female: 'Femme',
      option_gender_male: 'Homme',

      label_age: 'Âge :',
      label_hypertension: 'Hypertension :',
      option_hypertension_select: 'Sélectionner',
      option_hypertension_no: 'Non',
      option_hypertension_yes: 'Oui',

      label_heart_disease: 'Maladie cardiaque :',
      option_heart_disease_select: 'Sélectionner',
      option_heart_disease_no: 'Non',
      option_heart_disease_yes: 'Oui',

      label_smoking_history: 'Historique tabagique :',
      option_smoking_select: 'Sélectionner',
      option_smoking_never: 'Jamais fumé',
      option_smoking_unknown: "Pas d'information",
      option_smoking_current: 'Fumeur actuel',
      option_smoking_former: 'Ancien fumeur',

      label_bmi: 'IMC (kg/m²) :',
      label_hba1c: 'Niveau HbA1c (%) :',
      label_blood_glucose: 'Niveau glycémie (mg/dL) :',

      btn_predict: 'Prédire',

      warning_title: '⚠️ Avertissement Important',
      warning_text: "Ce test est un outil d'aide à la décision et ne remplace pas un diagnostic médical professionnel. Consultez toujours un médecin pour un diagnostic précis et des conseils personnalisés.",

      info_params_title: '📊 Informations sur les paramètres',
      param_hba1c: 'HbA1c : Valeur normale < 5.7%',
      param_glucose: 'Glycémie : Normale à jeun < 100 mg/dL',
      param_bmi: 'IMC : Normal entre 18.5 et 24.9',

      result_title: "Résultat de l'analyse",
      result_pred: 'Résultat prédiction',
      diabetic_result: 'DIABÉTIQUE',
      non_diabetic_result: 'NON DIABÉTIQUE',

      high_risk: 'Risque élevé détecté',
      high_risk_msg: 'Nous recommandons fortement de consulter un médecin pour des examens complémentaires.',
      recommendations_title: 'Recommandations immédiates',
      rec1: 'Consultez votre médecin dans les plus brefs délais',
      rec2: 'Surveillez votre alimentation',
      rec3: 'Augmentez votre activité physique',
      rec4: 'Contrôlez régulièrement votre glycémie',

      low_risk: 'Risque faible',
      low_risk_msg: 'Vos paramètres semblent dans la normale, continuez vos bonnes habitudes !',
      prevention_title: 'Conseils de prévention',
      prevention1: 'Maintenez une alimentation équilibrée',
      prevention2: 'Pratiquez une activité physique régulière',
      prevention3: 'Effectuez des contrôles médicaux annuels',
      prevention4: 'Surveillez votre poids',

      error: 'Erreur',
      api_error: 'Erreur API',
      network_error: 'Erreur réseau',

      footer_description: 'Votre partenaire de confiance pour la prévention et la détection précoce du diabète.',
      footer_contact_title: 'Contact',
      footer_location: '📍 61-3991 Saint André H2L 3W2. Canada',
      footer_copyright: '© 2025 DiabèteCheck. Tous droits réservés à Smartiadev.com.',
    },
    en: {
      nav_accueil: 'Home',
      nav_prediction: 'Prediction',
      nav_conseils: 'Tips',
      nav_regimes: 'Diets',
      nav_apropos: 'About',
      nav_connexion: 'Log in',
      nav_bonjour: 'Hello',
      confirm_logout: 'Do you want to log out?',

      pageheader_titre: 'Diabetes Risk Prediction Test',
      pageheader_desc: 'Fill the form below to get your risk assessment',

      form_medical_titre: '📊 Medical Information',
      form_medical_desc: 'Please fill all fields accurately',

      label_gender: 'Gender:',
      option_gender_select: 'Select',
      option_gender_female: 'Female',
      option_gender_male: 'Male',

      label_age: 'Age:',
      label_hypertension: 'Hypertension:',
      option_hypertension_select: 'Select',
      option_hypertension_no: 'No',
      option_hypertension_yes: 'Yes',

      label_heart_disease: 'Heart disease:',
      option_heart_disease_select: 'Select',
      option_heart_disease_no: 'No',
      option_heart_disease_yes: 'Yes',

      label_smoking_history: 'Smoking history:',
      option_smoking_select: 'Select',
      option_smoking_never: 'Never smoked',
      option_smoking_unknown: 'No information',
      option_smoking_current: 'Current smoker',
      option_smoking_former: 'Former smoker',

      label_bmi: 'BMI (kg/m²):',
      label_hba1c: 'HbA1c level (%):',
      label_blood_glucose: 'Blood glucose (mg/dL):',

      btn_predict: 'Predict',

      warning_title: '⚠️ Important Warning',
      warning_text: 'This test is a decision-support tool and does not replace professional medical diagnosis. Always consult a physician for an accurate diagnosis and personalized advice.',

      info_params_title: '📊 Parameters information',
      param_hba1c: 'HbA1c: Normal value < 5.7%',
      param_glucose: 'Glucose: Fasting normal < 100 mg/dL',
      param_bmi: 'BMI: Normal between 18.5 and 24.9',

      result_title: 'Analysis result',
      result_pred: 'Prediction result',
      diabetic_result: 'DIABETIC',
      non_diabetic_result: 'NON DIABETIC',

      high_risk: 'High risk detected',
      high_risk_msg: 'We strongly recommend consulting a doctor for further examinations.',
      recommendations_title: 'Immediate recommendations',
      rec1: 'Consult your doctor as soon as possible',
      rec2: 'Watch your diet',
      rec3: 'Increase physical activity',
      rec4: 'Monitor your blood glucose regularly',

      low_risk: 'Low risk',
      low_risk_msg: 'Your parameters seem normal, keep up the good habits!',
      prevention_title: 'Prevention tips',
      prevention1: 'Maintain a balanced diet',
      prevention2: 'Exercise regularly',
      prevention3: 'Get annual medical checkups',
      prevention4: 'Watch your weight',

      error: 'Error',
      api_error: 'API error',
      network_error: 'Network error',

      footer_description: 'Your trusted partner for diabetes prevention and early detection.',
      footer_contact_title: 'Contact',
      footer_location: '📍 61-3991 Saint André H2L 3W2. Canada',
      footer_copyright: '© 2025 DiabèteCheck. All rights reserved to Smartiadev.com.',
    },
    es: {
      nav_accueil: 'Inicio',
      nav_prediction: 'Predicción',
      nav_conseils: 'Consejos',
      nav_regimes: 'Dietas',
      nav_apropos: 'Acerca de',
      nav_connexion: 'Iniciar sesión',
      nav_bonjour: 'Hola',
      confirm_logout: '¿Quieres cerrar la sesión?',

      pageheader_titre: 'Prueba de Predicción de Riesgo de Diabetes',
      pageheader_desc: 'Complete el formulario para obtener una evaluación de su riesgo',

      form_medical_titre: '📊 Información Médica',
      form_medical_desc: 'Complete todos los campos con precisión',

      label_gender: 'Género:',
      option_gender_select: 'Seleccione',
      option_gender_female: 'Mujer',
      option_gender_male: 'Hombre',

      label_age: 'Edad:',
      label_hypertension: 'Hipertensión:',
      option_hypertension_select: 'Seleccione',
      option_hypertension_no: 'No',
      option_hypertension_yes: 'Sí',

      label_heart_disease: 'Enfermedad cardíaca:',
      option_heart_disease_select: 'Seleccione',
      option_heart_disease_no: 'No',
      option_heart_disease_yes: 'Sí',

      label_smoking_history: 'Historial de tabaquismo:',
      option_smoking_select: 'Seleccione',
      option_smoking_never: 'Nunca fumó',
      option_smoking_unknown: 'Sin información',
      option_smoking_current: 'Fumador actual',
      option_smoking_former: 'Exfumador',

      label_bmi: 'IMC (kg/m²):',
      label_hba1c: 'Nivel de HbA1c (%):',
      label_blood_glucose: 'Glucemia (mg/dL):',

      btn_predict: 'Predecir',

      warning_title: '⚠️ Advertencia importante',
      warning_text: 'Esta prueba es una herramienta de apoyo a la decisión y no reemplaza el diagnóstico médico profesional. Consulte siempre a un médico para un diagnóstico preciso y asesoramiento personalizado.',

      info_params_title: '📊 Información de parámetros',
      param_hba1c: 'HbA1c: Valor normal < 5.7%',
      param_glucose: 'Glucosa: En ayunas normal < 100 mg/dL',
      param_bmi: 'IMC: Normal entre 18.5 y 24.9',

      result_title: 'Resultado del análisis',
      result_pred: 'Resultado de la predicción',
      diabetic_result: 'DIABÉTICO',
      non_diabetic_result: 'NO DIABÉTICO',

      high_risk: 'Alto riesgo detectado',
      high_risk_msg: 'Recomendamos encarecidamente consultar a un médico para exámenes adicionales.',
      recommendations_title: 'Recomendaciones inmediatas',
      rec1: 'Consulte a su médico lo antes posible',
      rec2: 'Cuide su alimentación',
      rec3: 'Aumente la actividad física',
      rec4: 'Controle su glucosa con regularidad',

      low_risk: 'Riesgo bajo',
      low_risk_msg: 'Sus parámetros parecen normales, ¡siga con buenos hábitos!',
      prevention_title: 'Consejos de prevención',
      prevention1: 'Mantenga una dieta equilibrada',
      prevention2: 'Realice actividad física regular',
      prevention3: 'Hágase chequeos médicos anuales',
      prevention4: 'Controle su peso',

      error: 'Error',
      api_error: 'Error de API',
      network_error: 'Error de red',

      footer_description: 'Su socio de confianza para la prevención y detección temprana de la diabetes.',
      footer_contact_title: 'Contacto',
      footer_location: '📍 61-3991 Saint André H2L 3W2. Canada',
      footer_copyright: '© 2025 DiabèteCheck. Todos los derechos reservados a Smartiadev.com.',
    },
  };

  t = (key: string, fallback = ''): string => {
    const lang = this.currentLang();
    return this.dict[lang]?.[key] ?? fallback ?? key;
  };

  setLang(lang: Lang) {
    this.currentLang.set(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  private getSavedLang(): Lang {
    const saved = (localStorage.getItem(this.STORAGE_KEY) as Lang) || 'fr';
    return (['fr','en','es'] as Lang[]).includes(saved) ? saved : 'fr';
  }
}
