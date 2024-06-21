// src/hooks/useFormValidation.js
import { useState } from 'react';

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.technology.favoriteLanguage) newErrors.favoriteLanguage = 'Favorite Programming Language is required';
      if (!formData.technology.experience) newErrors.experience = 'Years of Experience is required';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.health.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.health.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.education.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.education.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useFormValidation;
