import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapterIndex } = location.state || { chapterIndex: 0 };

  // Expanded Questions
  const questions = [
    {
      id: 1,
      question: "What emotional state did Mark experience from isolation?",
      options: [
        {
          text: "Lonely and disconnected from others",
          img: "https://img.icons8.com/emoji/96/1f622.png",
        },
        {
          text: "Proud of finishing his tasks early",
          img: "https://img.icons8.com/emoji/96/1f973.png",
        },
        {
          text: "Excited to join the next crew activity",
          img: "https://img.icons8.com/emoji/96/1f91d.png",
        },
      ],
      answer: "Lonely and disconnected from others",
    },
    {
      id: 2,
      question: "What helps reduce loneliness onboard a ship?",
      options: [
        {
          text: "Isolation",
          img: "https://img.icons8.com/emoji/96/1f610.png",
        },
        {
          text: "Connection with others",
          img: "https://img.icons8.com/emoji/96/1f91d.png",
        },
        {
          text: "Overwork",
          img: "https://img.icons8.com/emoji/96/1f4aa.png",
        },
      ],
      answer: "Connection with others",
    },
    {
      id: 3,
      question: "Which activity is BEST for boosting morale onboard?",
      options: [
        {
          text: "Team games and bonding activities",
          img: "https://img.icons8.com/emoji/96/1f3ae.png",
        },
        {
          text: "Sleeping all day",
          img: "https://img.icons8.com/emoji/96/1f634.png",
        },
        {
          text: "Ignoring others",
          img: "https://img.icons8.com/emoji/96/1f644.png",
        },
      ],
      answer: "Team games and bonding activities",
    },
    {
      id: 4,
      question: "When you feel stressed onboard, what should you do?",
      options: [
        {
          text: "Talk to a trusted friend or officer",
          img: "https://img.icons8.com/emoji/96/1f46b.png",
        },
        {
          text: "Keep it all inside",
          img: "https://img.icons8.com/emoji/96/1f62a.png",
        },
        {
          text: "Work extra hours to forget",
          img: "https://img.icons8.com/emoji/96/1f4aa.png",
        },
      ],
      answer: "Talk to a trusted friend or officer",
    },
    {
      id: 5,
      question: "What daily habit helps improve mental health at sea?",
      options: [
        {
          text: "Regular exercise",
          img: "https://img.icons8.com/emoji/96/1f4aa.png",
        },
        {
          text: "Skipping meals",
          img: "https://img.icons8.com/emoji/96/1f372.png",
        },
        {
          text: "Never sleeping",
          img: "https://img.icons8.com/emoji/96/1f62a.png",
        },
      ],
      answer: "Regular exercise",
    },
    {
      id: 6,
      question: "What’s a positive way to fight boredom onboard?",
      options: [
        {
          text: "Learning a new skill or hobby",
          img: "https://img.icons8.com/emoji/96/1f3b6.png",
        },
        {
          text: "Complaining all the time",
          img: "https://img.icons8.com/emoji/96/1f620.png",
        },
        {
          text: "Staying in bed all day",
          img: "https://img.icons8.com/emoji/96/1f634.png",
        },
      ],
      answer: "Learning a new skill or hobby",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleOptionClick = (optionText) => {
    if (selectedOption === null) {
      setSelectedOption(optionText);
      if (optionText === questions[currentQuestion].answer) {
        setScore(score + 1);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setStreak(0);
  };

  const hasPassed = score / questions.length >= 0.6;

  const handleContinue = () => {
    navigate("/", { state: { quizPassed: true, chapterIndex } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      {quizFinished && hasPassed && (
        <Confetti recycle={false} numberOfPieces={400} />
      )}

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center border border-gray-200">
        {!quizFinished ? (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
              />
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-gray-800">
              {questions[currentQuestion].question}
            </h2>

            {/* Streak Encouragement */}
            {streak > 1 && (
              <p className="text-green-600 font-semibold mb-4 text-sm sm:text-base">
                🔥 {streak} correct in a row! Keep it up!
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {questions[currentQuestion].options.map((option, i) => {
                const isSelected = selectedOption === option.text;
                const isCorrect = option.text === questions[currentQuestion].answer;

                let optionStyle =
                  "relative flex flex-col items-center p-4 sm:p-6 bg-white rounded-2xl border-2 cursor-pointer transition transform hover:scale-105";

                if (selectedOption) {
                  if (isSelected) {
                    optionStyle += isCorrect
                      ? " border-green-500 bg-green-50"
                      : " border-red-500 bg-red-50";
                  } else if (isCorrect) {
                    optionStyle += " border-green-500 bg-green-50";
                  } else {
                    optionStyle += " border-gray-300 bg-gray-100 opacity-70";
                  }
                } else {
                  optionStyle += " border-gray-200 shadow-md";
                }

                return (
                  <motion.div
                    key={i}
                    className={optionStyle}
                    onClick={() => handleOptionClick(option.text)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={option.img}
                      alt={option.text}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3"
                    />
                    <p className="font-medium text-gray-700 text-sm sm:text-base text-center">
                      {option.text}
                    </p>

                    {isSelected && isCorrect && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2">
                        ✓
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2">
                        ✕
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={handleNextClick}
              disabled={!selectedOption}
              className="w-full sm:w-auto mt-8 px-6 sm:px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition hover:from-blue-700 hover:to-indigo-700"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz 🎯"
                : "Next ➡️"}
            </button>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-800">
                🎉 Quiz Complete!
              </h2>
              <p className="text-base sm:text-lg mb-6 text-gray-600">
                You scored{" "}
                <span className="font-bold text-indigo-600">{score}</span> /{" "}
                {questions.length}
              </p>

              {hasPassed ? (
                <>
                  <p className="text-green-600 font-semibold mb-6 text-base sm:text-lg">
                    Amazing work! You passed ✅
                  </p>
                  <button
                    onClick={handleContinue}
                    className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600"
                  >
                    Continue Course 🚀
                  </button>
                </>
              ) : (
                <>
                  <p className="text-red-500 font-semibold mb-6 text-base sm:text-lg">
                    You didn’t pass. Try again ❌
                  </p>
                  <button
                    onClick={handleRetry}
                    className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600"
                  >
                    Retry Quiz 🔄
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
