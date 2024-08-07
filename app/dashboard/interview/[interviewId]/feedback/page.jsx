"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db"; // Adjust the path as necessary

const FeedbackPage = ({ interviewId }) => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback from the database
    const fetchFeedback = async () => {
      // Replace this with the actual query to fetch feedback
      const feedback = await db
        .select("feedback", "rating", "createdAt")
        .from("UserAnswer")
        .where("mockIdRef", interviewId)
        .all();
      setFeedbackData(feedback);
    };

    fetchFeedback();
  }, [interviewId]);

  return (
    <div>
      <h1>Interview Feedback</h1>
      <div>
        {feedbackData.map((item, index) => (
          <div key={index} className="feedback-item">
            <p>
              <strong>Date:</strong> {item.createdAt}
            </p>
            <p>
              <strong>Rating:</strong> {item.rating}
            </p>
            <p>
              <strong>Feedback:</strong> {item.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
