// import { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "/src/Components/Buttons";

// function QuizDetails() {
//   const [showForm, setShowForm] = useState(false);
//   const [quizzes, setQuizzes] = useState([]);
//   const [quizCategotry] = useState([
//     "Result Focus (Professional Development & Compliance",
//     "Leadership",
//     "Stress Management",
//     "Crew Relationship",
//     "Help-Seeking",
//     "Empathy",
//     "Command Pressure",
//   ]);
//   const [category, setCategory] = useState("")
//   const [quiz, setQuiz] = useState({
//     question: "",
//     option_a: "",
//     option_b: "",
//     option_c: "",
//     option_d: "",
//     option_e: "",
//   });


//   const handleChange = (e) => {
//     setQuiz({
//       ...quiz,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         category: category,
//         question: quiz.question,
//         option_a: quiz.option_a,
//         option_b: quiz.option_b,
//         option_c: quiz.option_c,
//         option_d: quiz.option_d,
//         option_e: quiz.option_e,
//       };
//       const res = await axios.post(
//         "https://strivehigh.thirdvizion.com/api/quizcreate/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Quiz Created:", res.data);
//       alert("Quiz created successfully!");
//       setQuiz({
//         question: "",
//         option_a: "",
//         option_b: "",
//         option_c: "",
//         option_d: "",
//         option_e: "",
//       });
//       setShowForm(false);
//       fetchQuizzes();
//     } catch (err) {
//       console.error("Error creating quiz:", err);
//       alert("Failed to create quiz!");
//     }
//   };

//   const fetchQuizzes = async () => {
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_AI_QUIZ
//       );
//       console.log(res.data)
//       setQuizzes(res.data);
//     } catch (err) {
//       console.error("Error fetching quizzes:", err);
//     }
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto p-6 font-sans">
//       <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
//         Quiz Management
//       </h2>
//       {
//         !showForm && (
//           <Button onClick={() => { setShowForm(true) }}
//             label="Add Quiz"
//             className="w-full py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition"
//           />
//         )
//       }
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow"
//         >
//           <div>
//             <label className="font-medium">Choose Quiz Category</label>
//             <select className="p-2 border rounded-md w-full" value={category} onChange={(e) => { setCategory(e.target.value) }}>
//               <option>Choose Your Quiz Category</option>
//               {

//                 quizCategotry.map((item, index) => {
//                   return (<>
//                     <option key={index}>
//                       {item}
//                     </option>
//                   </>)

//                 })

//               }
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-semibold">Question:</label>
//             <input
//               type="text"
//               name="question"
//               value={quiz.question}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded-md"
//             />
//           </div>

//           {["a", "b", "c", "d", "e"].map((opt) => (
//             <div key={opt} className="flex flex-col">
//               <label className="mb-1 font-semibold">
//                 Option {opt.toUpperCase()}:
//               </label>
//               <input
//                 type="text"
//                 name={`option_${opt}`}
//                 value={quiz[`option_${opt}`]}
//                 onChange={handleChange}
//                 required={opt !== "e"}
//                 className="p-2 border rounded-md"
//               />
//             </div>
//           ))}
//           <Button label="Submit" className="py-3 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700 transition" />
//         </form>
//       )}

//       <div className="mt-8">
//         <h3 className="text-xl font-bold text-gray-800 mb-3">
//           Existing Quizzes
//         </h3>
//         {quizzes.length === 0 ? (
//           <p>No quizzes available.</p>
//         ) : (
//           <ul className="space-y-3">
//             {quizzes.map((q) => (
//               <li
//                 key={q.id}
//                 className="border rounded-md p-4 bg-gray-50 shadow-sm"
//               >
//                 <strong>Question:</strong> {q.question}
//                 < br /><strong>Category:</strong> {q.category}
//                 <ul className="list-disc pl-5 mt-2 text-gray-700">
//                   <li>A: {q.option_a}</li>
//                   <li>B: {q.option_b}</li>
//                   <li>C: {q.option_c}</li>
//                   <li>D: {q.option_d}</li>
//                   <li>E: {q.option_e}</li>
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizDetails;





import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

function QuizDetails() {
  const [showForm, setShowForm] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [quizCategotry] = useState([
    "Result Focus (Professional Development & Compliance)",
    "Leadership",
    "Stress Management",
    "Crew Relationship",
    "Help-Seeking",
    "Empathy",
    "Command Pressure",
  ]);
  const [category, setCategory] = useState("");
  const [quiz, setQuiz] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    option_e: "",
  });

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        category,
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
        { headers: { "Content-Type": "application/json" } }
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
      const res = await axios.get(import.meta.env.VITE_AI_QUIZ);
      setQuizzes(res.data);
      setFilteredQuizzes(res.data); // keep a copy for filtering
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // ✅ Filter logic: runs whenever searchQuery or categoryFilter changes
  useEffect(() => {
    let result = quizzes;

    if (searchQuery.trim()) {
      result = result.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((q) => q.category === categoryFilter);
    }

    setFilteredQuizzes(result);
  }, [searchQuery, categoryFilter, quizzes]);

  return (
    <div className="max-w-7xl mx-auto p-6 mb-20 font-sans">
      {/* Header Row - Title (Left) + Search & Filter (Right) */}
      <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Quiz Management</h2>

        {/* 🔎 Search + Filter Side by Side */}
        <div className="flex flex-col lg:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by question..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter by Category</option>
            {quizCategotry.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Quiz Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-6"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Create New Quiz
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 rounded-full hover:bg-red-100 transition"
              >
                <X size={22} className="text-gray-500 hover:text-red-600" />
              </button>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Category
              </label>
              <select
                className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose Your Quiz Category</option>
                {quizCategotry.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>

            {/* Question */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Question
              </label>
              <input
                type="text"
                name="question"
                value={quiz.question}
                onChange={handleChange}
                required
                placeholder="Enter your quiz question"
                className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["a", "b", "c", "d", "e"].map((opt) => (
                <div key={opt} className="flex flex-col">
                  <label className="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Option {opt.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={`option_${opt}`}
                    value={quiz[`option_${opt}`]}
                    onChange={handleChange}
                    required={opt !== "e"}
                    placeholder={`Enter option ${opt.toUpperCase()}`}
                    className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              label="Submit Quiz"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition transform"
            ></button>
          </motion.form>
        )}
      </AnimatePresence>


      {/* Existing Quizzes Header + Small Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Existing Quizzes</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition"
          >
            <div className="flex justify-center items-center gap-1 px-5">
              <Plus size={18} className="inline" />
              <h1 className="inline">Add Quiz</h1>
            </div>
          </button>
        )}
      </div>

      {/* Quiz List */}
      <div className="grid gap-4">
        {filteredQuizzes.length === 0 ? (
          <p className="text-gray-500 text-center">
            No quizzes match your search/filter.
          </p>
        ) : (
          filteredQuizzes.map((q) => (
            <motion.div
              key={q.id}
              className="border rounded-2xl p-5 bg-gray-50 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Category Badge */}
              <div className="flex justify-start mb-3">
                <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full shadow-sm">
                  {q.category}
                </span>
              </div>

              {/* Question */}
              <h4 className="font-semibold text-lg text-gray-800">{q.question}</h4>

              {/* Options */}
              <ul className="list-disc pl-5 text-gray-700 mt-3 space-y-1">
                <li>A: {q.option_a}</li>
                <li>B: {q.option_b}</li>
                <li>C: {q.option_c}</li>
                <li>D: {q.option_d}</li>
                {q.option_e && <li>E: {q.option_e}</li>}
              </ul>
            </motion.div>
          ))
        )}
      </div>
    </div>

  );
}

export default QuizDetails;
