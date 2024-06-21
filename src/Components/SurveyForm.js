
import React, { useContext, useState,useEffect } from 'react';
import { FormContext } from '../Contexts/FormContext';
import useFormValidation from "../Hooks/userFormValidation";
import useFetchAdditionalQuestions from '../Hooks/useFetchAdditionalQuestions';
import "./SurveyForm.css"

const SurveyForm = () => {
  const { formData, updateFormData } = useContext(FormContext);
  const { errors, validate } = useFormValidation(formData);
  const { additionalQuestions, loading, fetchQuestions } = useFetchAdditionalQuestions(formData.surveyTopic);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (section, key) => (e) => {
    updateFormData(section, key, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      fetchQuestions(formData.surveyTopic);
    }
  }, [submitted, formData.surveyTopic, fetchQuestions]);

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1 className="display-5 my-5 text-center">Survey Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
          <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={formData.fullName || ""}
          onChange={handleChange(null, 'fullName')}
        />
        {errors.fullName && <span>{errors.fullName}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email|| ""}
          onChange={handleChange(null, 'email')}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Survey Topic:</label>
        <select
        className="form-select"
          value={formData.surveyTopic|| ""}
          onChange={handleChange(null, 'surveyTopic')}
        >
          <option defaultValue="">Select...</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
      </div>

      {formData.surveyTopic === 'Technology' && (
        <div>
          <label>Favorite Programming Language:</label>
          <select
          className="form-select"
            value={formData.technology.favoriteLanguage}
            onChange={handleChange('technology', 'favoriteLanguage')}
          >
            <option defaultValue="">Select...</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
          </select>
          {errors.favoriteLanguage && <span>{errors.favoriteLanguage}</span>}

          <br/> 
          <label>Years of Experience:</label>
          <input
            type="number"
            value={formData.technology.experience}
            onChange={handleChange('technology', 'experience')}
          />
          {errors.experience && <span>{errors.experience}</span>}
        </div>
      )}

      {formData.surveyTopic === 'Health' && (
        <div>
          <label>Exercise Frequency:</label>
          <select
          className="form-select"
            value={formData.health.exerciseFrequency}
            onChange={handleChange('health', 'exerciseFrequency')}
          >
            <option defaultValue="">Select...</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
          </select>
          {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
          <br/> 
          <label>Diet Preference:</label>
          <select
          className="form-select"
            value={formData.health.dietPreference}
            onChange={handleChange('health', 'dietPreference')}
          >
            <option defaultValue="">Select...</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
          {errors.dietPreference && <span>{errors.dietPreference}</span>}
        </div>
      )}

      {formData.surveyTopic === 'Education' && (
        <div>
          <label>Highest Qualification:</label>
          <select
            value={formData.education.highestQualification}
            onChange={handleChange('education', 'highestQualification')}
            className="form-select"
          >
            <option defaultValue="">Select...</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.highestQualification && <span>{errors.highestQualification}</span>}
          <br/> 
          <label>Field of Study:</label>
          <input
            type="text"
            value={formData.education.fieldOfStudy}
            onChange={handleChange('education', 'fieldOfStudy')}
          />
          {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
        </div>
      )}

      <div >
        <label>Feedback:</label>
        <textarea
          value={formData.feedback|| ""}
          onChange={handleChange(null, 'feedback')}
        />
        {errors.feedback && <span>{errors.feedback}</span>}
      </div>
</div>
      <button type="submit" className='btn btn-primary'>Submit</button>

      {submitted && (
        <div className='formsummary'>
          <h3>Summary</h3>
          <p>Full Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Survey Topic: {formData.surveyTopic}</p>
          {formData.surveyTopic === 'Technology' && (
            <>
              <p>Favorite Programming Language: {formData.technology.favoriteLanguage}</p>
              <p>Years of Experience: {formData.technology.experience}</p>
            </>
          )}
          {formData.surveyTopic === 'Health' && (
            <>
              <p>Exercise Frequency: {formData.health.exerciseFrequency}</p>
              <p>Diet Preference: {formData.health.dietPreference}</p>
            </>
          )}
          {formData.surveyTopic === 'Education' && (
            <>
              <p>Highest Qualification: {formData.education.highestQualification}</p>
              <p>Field of Study: {formData.education.fieldOfStudy}</p>
            </>
          )}
          <p className="text-break">Feedback: {formData.feedback}</p>

          {loading && <p>Loading additional questions...</p>}
          {additionalQuestions.length > 0 && (
            <div>
              <h4>Additional Questions</h4>
              {additionalQuestions.map((question, index) => (
                <div key={index}>
                  <label>{question.text}</label>
                  <input type="text"  className="form-control"/>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
