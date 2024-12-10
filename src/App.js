import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [questionData, setQuestionData] = useState(null); // Holds the question data
  const [loading, setLoading] = useState(true);           // Tracks loading state
  const [error, setError] = useState(null);               // Tracks error state

  useEffect(() => {
    // Fetch question from API
    axios
      .get("/questions.json") // Replace with your actual API endpoint
      .then((response) => {
        setQuestionData(response.data); // Save question data to state
        setLoading(false);             // Stop loading when data is fetched
      })
      .catch((err) => {
        setError("Error fetching question. Please try again."); // Set error state
        setLoading(false);                                     // Stop loading on error
      });
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading question...</div>;
  }

  // Show an error message if an error occurs during the fetch
  if (error) {
    return <div>{error}</div>;
  }

  // Render the question and options once the data is available
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Quiz App</h1>
      <div>
        <h2>{questionData.question}</h2>
        <ul>
          {questionData.options.map((option, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "lightblue",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
