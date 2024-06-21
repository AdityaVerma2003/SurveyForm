const questions = {
  Technology: [
    { text: "What is your preferred code editor?" },
    { text: "How do you stay updated with new technologies?" }
  ],
  Health: [
    { text: "How many hours do you sleep on average?" },
    { text: "Do you take any supplements?" }
  ],
  Education: [
    { text: "What is your favorite subject?" },
    { text: "Do you prefer online or offline classes?" }
  ]
};

export const fetchQuestionsByTopic = (topic) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ questions: questions[topic] || [] });
    }, 1000); // Simulate network delay
  });
};