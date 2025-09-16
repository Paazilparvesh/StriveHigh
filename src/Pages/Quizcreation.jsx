import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Components/Buttons";

function QuizCreate() {
  const [showForm, setShowForm] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizCategotry] = useState([
    "Result Focus (Professional Development & Compliance",
    "Leadership",
    "Stress Management",
    "Crew Relationship",
    "Help-Seeking",
    "Empathy",
    "Command Pressure",
  ]);
  const [category, setCategory] = useState("")
  const [quiz, setQuiz] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    option_e: "",
  });


  const handleChange = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        category: category,
        question: quiz.question,
        option_a: quiz.option_a,
        option_b: quiz.option_b,
        option_c: quiz.option_c,
        option_d: quiz.option_d,
        option_e: quiz.option_e,
      };
      const res = await axios.post(
        "https://strivehigh.thirdvizion.com/api/quizcreate/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quiz Created:", res.data);
      alert("Quiz created successfully!");
      setQuiz({
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        option_e: "",
      });
      setShowForm(false);
      fetchQuizzes();
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz!");
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_AI_QUIZ
      );
      console.log(res.data)
      setQuizzes(res.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Quiz Management
      </h2>
      {
        !showForm && (
          <Button onClick={() => { setShowForm(true) }}
            label="Add Quiz"
            className="w-full py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition"
          />
        )
      }
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow"
        >
          <div>
            <label className="font-medium">Choose Quiz Category</label>
            <select className="p-2 border rounded-md w-full" value={category} onChange={(e) => { setCategory(e.target.value) }}>
              <option>Choose Your Quiz Category</option>
              {

                quizCategotry.map((item, index) => {
                  return (<>
                    <option key={index}>
                      {item}
                    </option>
                  </>)

                })

              }
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Question:</label>
            <input
              type="text"
              name="question"
              value={quiz.question}
              onChange={handleChange}
              required
              className="p-2 border rounded-md"
            />
          </div>

          {["a", "b", "c", "d", "e"].map((opt) => (
            <div key={opt} className="flex flex-col">
              <label className="mb-1 font-semibold">
                Option {opt.toUpperCase()}:
              </label>
              <input
                type="text"
                name={`option_${opt}`}
                value={quiz[`option_${opt}`]}
                onChange={handleChange}
                required={opt !== "e"}
                className="p-2 border rounded-md"
              />
            </div>
          ))}
          <Button label="Submit" className="py-3 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700 transition" />
        </form>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Existing Quizzes
        </h3>
        {quizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          <ul className="space-y-3">
            {quizzes.map((q) => (
              <li
                key={q.id}
                className="border rounded-md p-4 bg-gray-50 shadow-sm"
              >
                <strong>Question:</strong> {q.question}
                < br /><strong>Category:</strong> {q.category}
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>A: {q.option_a}</li>
                  <li>B: {q.option_b}</li>
                  <li>C: {q.option_c}</li>
                  <li>D: {q.option_d}</li>
                  <li>E: {q.option_e}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QuizCreate;
