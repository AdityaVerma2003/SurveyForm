// src/hooks/validate.js
export const validate = (values) => {
  let errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.surveyTopic) {
    errors.surveyTopic = 'Survey Topic is required';
  }

  if (values.surveyTopic === 'Technology') {
    if (!values.technologySection.favoriteProgrammingLanguage) {
      errors.technologySection = {
        ...errors.technologySection,
        favoriteProgrammingLanguage: 'Favorite Programming Language is required',
      };
    }
    if (!values.technologySection.yearsOfExperience) {
      errors.technologySection = {
        ...errors.technologySection,
        yearsOfExperience: 'Years of Experience is required',
      };
    }
  } else if (values.surveyTopic === 'Health') {
    if (!values.healthSection.exerciseFrequency) {
      errors.healthSection = {
        ...errors.healthSection,
        exerciseFrequency: 'Exercise Frequency is required',
      };
    }
    if (!values.healthSection.dietPreference) {
      errors.healthSection = {
        ...errors.healthSection,
        dietPreference: 'Diet Preference is required',
      };
    }
  } else if (values.surveyTopic === 'Education') {
    if (!values.educationSection.highestQualification) {
      errors.educationSection = {
        ...errors.educationSection,
        highestQualification: 'Highest Qualification is required',
      };
    }
    if (!values.educationSection.fieldOfStudy) {
      errors.educationSection = {
        ...errors.educationSection,
        fieldOfStudy: 'Field of Study is required',
      };
    }
  }

  if (!values.feedback) {
    errors.feedback = 'Feedback is required';
  } else if (values.feedback.length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }

  return errors;
};
