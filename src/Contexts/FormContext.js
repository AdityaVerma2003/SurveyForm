// src/FormContext.js
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    technology: {
      favoriteLanguage: '',
      experience: '',
    },
    health: {
      exerciseFrequency: '',
      dietPreference: '',
    },
    education: {
      highestQualification: '',
      fieldOfStudy: '',
    },
    feedback: '',
  });

  const updateFormData = (section, key, value) => {
    setFormData((prevData) => {
      if (section) {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [key]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [key]: value,
        };
      }
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};