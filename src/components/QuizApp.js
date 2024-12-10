import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from the JSON file
    axios
      .get("/questions.json")
      .then((response) => {
        setQuestions(response.data || []); // Default to an empty array if data is null or undefined
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = index;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        totalScore += 1;
      } else if (userAnswers[idx] !== undefined) {
        totalScore -= 0.25;
      }
    });
    setScore(totalScore);
  };

  const handleNavigation = (direction) => {
    setCurrentQuestion((prev) => prev + direction);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available. Please try again later.</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
        console.log(currentQuestion);
      {score === null ? (
        <>
          <h1>Question {currentQuestion + 1}</h1>
          <p>{questions[currentQuestion].question}</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: userAnswers[currentQuestion] === index ? "lightblue" : "white",
                  }}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => handleNavigation(-1)}
              disabled={currentQuestion === 0}
              style={{ marginRight: "10px" }}
            >
              Previous
            </button>
            <button
              onClick={() => handleNavigation(1)}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={calculateScore}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Submit
            </button>
          )}
        </>
      ) : (
        <div>
          <h1>Final Score: {score}</h1>
          <button
            onClick={() => {
              setScore(null);
              setUserAnswers([]);
              setCurrentQuestion(0);
            }}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
