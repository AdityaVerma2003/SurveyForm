// src/App.js
import React from 'react';
import { FormProvider } from './Contexts/FormContext';
import SurveyForm from './Components/SurveyForm';

const App = () => {
  return (
    <FormProvider>
      <SurveyForm />
    </FormProvider>
  );
};

export default App;
