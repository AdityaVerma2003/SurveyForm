// src/hooks/useFetchAdditionalQuestions.js
import { useState, useCallback } from 'react';
import { fetchQuestionsByTopic } from "../Api/api";

const useFetchAdditionalQuestions = () => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = useCallback(async (surveyTopic) => {
    setLoading(true);
    try {
      const data = await fetchQuestionsByTopic(surveyTopic);
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { additionalQuestions, loading, fetchQuestions };
};

export default useFetchAdditionalQuestions;
