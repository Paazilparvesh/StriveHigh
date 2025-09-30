// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
//   BarChart,
//   Bar,
// } from "recharts";
// import CircularProgress from "/src/Components/ReusableComponents/CircularProgress.jsx";
// import { motion } from "framer-motion";

// function UserCardDetails({ email, onBack }) {
//   const [user, setUser] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [sistuvation, setSistuvation] = useState([]);
//   const [score, setScore] = useState([]);
//   const [overallScore, setOverallScore] = useState(0);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_USER_API}?email=${email}`)
//       .then((res) => {
//         if (res.data && !Array.isArray(res.data)) {
//           setUser(res.data);
//         } else if (Array.isArray(res.data)) {
//           const foundUser = res.data.find(
//             (u) => u.user_email?.toLowerCase() === email.toLowerCase()
//           );
//           if (foundUser) setUser(foundUser);
//           else setErrorMsg("User not found");
//         }
//       })
//       .catch((err) => {
//         setErrorMsg(err.response?.data?.error || "Server not responding");
//         console.error("Error fetching user:", err);
//       });
//   }, [email]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_SOAR_CARD_URL}${email}/`)
//       .then((res) => {
//         setSistuvation(res.data);
//         const fetchedScores = res.data.overall_avg || [];
//         const numericScores = fetchedScores.map((s) => Number(s));
//         setScore(
//           numericScores.map((s, index) => ({ month: (index + 1).toString(), score: s }))
//         );
//         const totalScore =
//           numericScores.length > 0
//             ? Math.round(numericScores.reduce((a, b) => a + b, 0) / numericScores.length)
//             : 0;
//         setOverallScore(totalScore);
//       })
//       .catch((err) => console.error("Error fetching soar card details:", err));
//   }, [email]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_DAILY_CHECK}${email}/`)
//       .then((res) => {
//         setChartData(
//           res.data.map((item) => ({
//             day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
//             value: item.percentage,
//           }))
//         );
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   }, [email]);

//   if (errorMsg)
//     return <p className="text-red-500 text-lg font-medium">{errorMsg}</p>;
//   if (!user)
//     return (
//       <p className="text-xl font-medium text-red-500">Loading user details...</p>
//     );

//   const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

//   return (
//     <div className="details-page p-6 ">
//       <button
//         onClick={onBack}
//         className="mb-6 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>

//       {/* User Info + Overall Score */}
//       <div className="flex flex-col md:flex-row gap-8 mb-10">
//         <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-3">
//           <p><span className="font-semibold text-gray-600">Name:</span> {user.sailor_name || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Email:</span> {user.user_email || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Age:</span> {user.age ?? "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Company:</span> {user.company || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Rank:</span> {user.rank || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Experience:</span> {user.experience_years ?? "N/A"} years</p>
//           <p><span className="font-semibold text-gray-600">Home Location:</span> {user.home_location || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Spouse:</span> {user.spouse_name || "N/A"}</p>
//           <p><span className="font-semibold text-gray-600">Hobbies:</span> {user.hobbies || "N/A"}</p>
//         </div>

//         <div className="w-1/4 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
//           {/* Circular Progress Component */}
//           <CircularProgress
//             percentage={overallScore}
//             size={150}
//             strokeWidth={15}
//           />
//           <p className="mt-3 font-semibold text-gray-700 text-center">
//             Overall Soar Card Score
//           </p>
//         </div>
//       </div>

//       {/* Graphs Row */}
//       <div className="flex flex-col lg:flex-row gap-6 mb-10">
//         {/* Daily Check-in */}
//         <div className="flex-1 bg-white rounded-2xl p-5 shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Daily Check-in</h2>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={260}>
//               <LineChart data={chartData}>
//                 <defs>
//                   <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
//                     <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#666" }} height={40} />
//                 <Area type="monotone" dataKey="value" stroke="none" fill="url(#waveGradient)" fillOpacity={0.4} />
//                 <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3}
//                   dot={({ cx, cy, payload }) => (
//                     <circle
//                       cx={cx} cy={cy} r={payload.day === today ? 6 : 3}
//                       fill="#3b82f6" stroke="white" strokeWidth={2} />
//                   )}
//                 />
//                 <Tooltip cursor={{ stroke: "transparent" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-red-500 font-medium">No check-in data available</p>
//           )}
//         </div>

//         {/* Soar Card */}
//         <div className="flex-1 bg-white rounded-2xl p-5 shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Soar Card (6 Months)</h2>
//           {score.length > 0 ? (
//             <ResponsiveContainer width="100%" height={260}>
//               <BarChart data={score}>
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#666" }} height={40} />
//                 <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
//                 <Tooltip cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-red-500 font-medium">No soar card data available</p>
//           )}
//         </div>
//       </div>

//       {/* Category Wise Averages */}
//       <div className="bg-white rounded-2xl p-6 mb-10 shadow-md">
//         <h1 className="text-xl font-bold text-center mb-6">Based on Domain</h1>

//         {sistuvation?.category_wise_avgs && sistuvation.category_wise_avgs.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {sistuvation.category_wise_avgs.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-50 rounded-xl p-5 shadow-inner"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.01 }}
//                 viewport={{ once: true, amount: 0 }}
//               >
//                 <h2 className="text-lg font-semibold">{item.category}</h2>
//                 <div className="flex items-center gap-3 mt-4">
//                   <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-4 ${item.avg > 0 ? "bg-blue-500" : "bg-gray-200"}`}
//                       style={{ width: 0 }}
//                       animate={{ width: `${Math.round(item.avg)}%` }}
//                       transition={{ duration: 1.2, delay: 0.3 }}
//                     ></motion.div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">
//                     {item.avg > 0 ? `${Math.round(item.avg)}%` : "No Data"}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-red-500 font-medium mt-4">
//             No domain-based data available
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserCardDetails;





import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import CircularProgress from "/src/Components/ReusableComponents/CircularProgress.jsx";
import { motion } from "framer-motion";

function UserDashboard({ email, onBack }) {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [chartData, setChartData] = useState([]);
  const [situation, setSituation] = useState({});
  const [score, setScore] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  // --- Fetch User Info ---
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_USER_API}?email=${email}`)
      .then((res) => {
        if (res.data && !Array.isArray(res.data)) {
          setUser(res.data);
        } else if (Array.isArray(res.data)) {
          const foundUser = res.data.find(
            (u) => u.user_email?.toLowerCase() === email.toLowerCase()
          );
          if (foundUser) setUser(foundUser);
          else setErrorMsg("User not found");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.error || "Server not responding");
        console.error("Error fetching user:", err);
      });
  }, [email]);

  // --- Fetch Soar Card Data ---
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOAR_CARD_URL}${email}/`)
      .then((res) => {
        setSituation(res.data);

        const fetchedScores = res.data.overall_avg || [];
        const numericScores = fetchedScores.map((s) => Number(s));

        // ✅ use first/latest score only
        const latestScore = numericScores.length > 0 ? numericScores[0] : 0;
        setOverallScore(Math.round(latestScore));

        // still keep full score history for bar chart (if needed)
        setScore(
          numericScores.map((s, index) => ({
            month: (index + 1).toString(),
            score: s,
          }))
        );
      })
      .catch((err) =>
        console.error("Error fetching soar card details:", err)
      );
  }, [email]);


  // --- Fetch Daily Check-in Data ---
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DAILY_CHECK}${email}/`)
      .then((res) => {
        setChartData(
          res.data.map((item) => ({
            day: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: item.percentage,
          }))
        );
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  }, [email]);

  if (errorMsg)
    return <p className="text-red-500 text-lg font-medium">{errorMsg}</p>;
  if (!user)
    return (
      <p className="text-xl font-medium text-red-500">Loading user details...</p>
    );

  // helper function to get greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Remove duplicates & limit to first 15 categories
  const uniqueCategories = situation?.category_wise_avgs
    ? situation.category_wise_avgs.reduce((acc, curr) => {
      if (!acc.some((item) => item.category === curr.category)) {
        acc.push(curr);
      }
      return acc;
    }, [])
    : [];

  const limitedCategories = uniqueCategories.slice(0, 15);

  const categoryData = limitedCategories.map((item) => ({
    name: item.category,
    value: Math.round(item.avg),
  }));


  const COLORS = [
    "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6",
    "#ec4899", "#14b8a6", "#eab308", "#6366f1", "#f97316",
    "#10b981", "#0ea5e9", "#a855f7", "#f43f5e", "#84cc16"
  ];




  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    // <section className="px-4 py-6 max-w-6xl mx-auto">
    //   {/* Back Button */}
    //   <button
    //     onClick={onBack}
    //     className="mb-6 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
    //   >
    //     ← Back
    //   </button>

    //   {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    //     {/* Left Column - Seafarers 
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6"
    //     >
    //       <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //         Sor Seafarers
    //       </h2>
    //       <p className="text-3xl text-gray-500 mb-4">
    //         {getGreeting()}, {user.sailor_name || "Sailor"}
    //       </p>


    //       <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 items-start">
    //         {/* Circular Progress
    //         <div className="flex flex-col items-center">
    //           <CircularProgress percentage={overallScore} size={140} strokeWidth={14} />
    //           <p className="mt-3 font-semibold text-gray-700 text-center text-sm">
    //             Behavioral Competency Progress
    //           </p>
    //         </div>

    //         {/* Emotional Trends + Learning Milestones
    //         <div className="sm:col-span-2 space-y-6">
    //           {/* Emotional Trends 
    //           <div>
    //             <h3 className="text-sm font-medium text-gray-700">
    //               Emotional Trends <span className="text-xs text-gray-400">Last 7 days</span>
    //             </h3>
    //             <div className="mt-2 bg-gray-50 rounded-md p-3">
    //               {chartData.length > 0 ? (
    //                 <ResponsiveContainer width="100%" height={120}>
    //                   <LineChart data={chartData}>
    //                     <Area
    //                       type="monotone"
    //                       dataKey="value"
    //                       stroke="none"
    //                       fill="url(#waveGradient)"
    //                     />
    //                     <defs>
    //                       <linearGradient
    //                         id="waveGradient"
    //                         x1="0"
    //                         y1="0"
    //                         x2="0"
    //                         y2="1"
    //                       >
    //                         <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
    //                         <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
    //                       </linearGradient>
    //                     </defs>
    //                     <Line
    //                       type="monotone"
    //                       dataKey="value"
    //                       stroke="#3b82f6"
    //                       strokeWidth={3}
    //                       dot={({ cx, cy, payload }) => (
    //                         <circle
    //                           cx={cx}
    //                           cy={cy}
    //                           r={payload.day === today ? 6 : 3}
    //                           fill="#3b82f6"
    //                           stroke="white"
    //                           strokeWidth={2}
    //                         />
    //                       )}
    //                     />
    //                     <XAxis
    //                       dataKey="day"
    //                       axisLine={false}
    //                       tickLine={false}
    //                       tick={{ fontSize: 12, fill: "#666" }}
    //                       height={30}
    //                     />
    //                   </LineChart>
    //                 </ResponsiveContainer>
    //               ) : (
    //                 <p className="text-red-500 text-sm">No check-in data</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Learning Milestones
    //           <div>
    //             <h3 className="text-sm font-medium text-gray-700">
    //               Learning Milestones
    //             </h3>
    //             <div className="mt-3">
    //               {situation?.category_wise_avgs?.slice(0, 1).map((item, i) => (
    //                 <div key={i}>
    //                   <p className="text-xs text-gray-600 mb-1">
    //                     {item.category}
    //                   </p>
    //                   <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
    //                     <motion.div
    //                       className="h-3 bg-blue-500"
    //                       style={{ width: 0 }}
    //                       animate={{ width: `${Math.round(item.avg)}%` }}
    //                       transition={{ duration: 1 }}
    //                     />
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
    //         <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //           Category Performance Distribution
    //         </h2>

    //         <ResponsiveContainer width="100%" height={450}>
    //           <PieChart>
    //             <Pie
    //               data={categoryData}
    //               dataKey="value"
    //               nameKey="name"
    //               innerRadius={60}
    //               outerRadius={90}
    //               paddingAngle={3}
    //             >
    //               {categoryData.map((entry, index) => (
    //                 <Cell
    //                   key={`cell-${index}`}
    //                   fill={COLORS[index % COLORS.length]}
    //                 />
    //               ))}
    //             </Pie>
    //             <Tooltip />
    //             <Legend layout="horizontal" verticalAlign="bottom" align="center" />
    //           </PieChart>
    //         </ResponsiveContainer>


    //         <p className="text-sm text-gray-500 mt-3 text-center">
    //           Last Updated Avg Score: <span className="font-semibold">{overallScore}%</span>
    //         </p>
    //       </div>
    //     </motion.article>

    //     {/* Right Column - Management
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6, delay: 0.1 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6"
    //     >
    //       <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //         Management
    //       </h2>
    //       <p className="text-sm text-gray-500 mb-4">
    //         Training Progress & Behavioral Safety
    //       </p>





    //       {/* Training Completion (Soar Card Average) 
    //       <div className="mb-6">
    //         <h3 className="text-sm font-medium text-gray-700">Training Completion</h3>
    //         <div className="mt-2">
    //           <div className="w-full bg-gray-200 rounded-full h-3">
    //             <motion.div
    //               className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-yellow-400"
    //               initial={{ width: 0 }}
    //               animate={{ width: `${overallScore}%` }}
    //               transition={{ duration: 1 }}
    //             />
    //           </div>
    //           <p className="text-xs text-gray-500 mt-1">
    //             {overallScore}% completed last 6 months
    //           </p>
    //         </div>
    //       </div>

    //       {/* Competency Trends (Bar Chart)
    //       <div className="mb-6">
    //         <h3 className="text-sm font-medium text-gray-700">Competency Trends</h3>
    //         <ResponsiveContainer width="100%" height={150}>
    //           <BarChart data={score}>
    //             <XAxis dataKey="month" tickLine={false} axisLine={false} />
    //             <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
    //           </BarChart>
    //         </ResponsiveContainer>
    //       </div>

    //       {/* Behavioral Risk Indicators
    //       <div>
    //         <h3 className="text-sm font-medium text-gray-700 mb-3">
    //           Behavioral Risk Indicators
    //         </h3>
    //         {situation?.category_wise_avgs?.map((item, i) => (
    //           <div key={i} className="mb-3">
    //             <div className="flex justify-between text-xs">
    //               <span>{item.category}</span>
    //               <span>{Math.round(item.avg)}%</span>
    //             </div>
    //             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
    //               <motion.div
    //                 className="h-2 bg-emerald-500"
    //                 initial={{ width: 0 }}
    //                 animate={{ width: `${Math.round(item.avg)}%` }}
    //                 transition={{ duration: 1, delay: i * 0.1 }}
    //               />
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </motion.article>
    //   </div> */}

    //   {/* Bento Grid */}
    //   <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[200px]">
    //     {/* Left big section (Seafarers) */}
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-4 row-span-2"
    //     >
    //       <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //         Sor Seafarers
    //       </h2>
    //       <p className="text-3xl text-gray-500 mb-4">
    //         {getGreeting()}, {user.sailor_name || "Sailor"}
    //       </p>


    //       <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 items-start">
    //         {/* Circular Progress */}
    //         <div className="flex flex-col items-center">
    //           <CircularProgress percentage={overallScore} size={140} strokeWidth={14} />
    //           <p className="mt-3 font-semibold text-gray-700 text-center text-sm">
    //             Behavioral Competency Progress
    //           </p>
    //         </div>

    //         {/* Emotional Trends + Learning Milestones */}
    //         <div className="sm:col-span-2 space-y-6">
    //           {/* Emotional Trends */}
    //           <div>
    //             <h3 className="text-sm font-medium text-gray-700">
    //               Emotional Trends <span className="text-xs text-gray-400">Last 7 days</span>
    //             </h3>
    //             <div className="mt-2 bg-gray-50 rounded-md p-3">
    //               {chartData.length > 0 ? (
    //                 <ResponsiveContainer width="100%" height={120}>
    //                   <LineChart data={chartData}>
    //                     <Area
    //                       type="monotone"
    //                       dataKey="value"
    //                       stroke="none"
    //                       fill="url(#waveGradient)"
    //                     />
    //                     <defs>
    //                       <linearGradient
    //                         id="waveGradient"
    //                         x1="0"
    //                         y1="0"
    //                         x2="0"
    //                         y2="1"
    //                       >
    //                         <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
    //                         <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
    //                       </linearGradient>
    //                     </defs>
    //                     <Line
    //                       type="monotone"
    //                       dataKey="value"
    //                       stroke="#3b82f6"
    //                       strokeWidth={3}
    //                       dot={({ cx, cy, payload }) => (
    //                         <circle
    //                           cx={cx}
    //                           cy={cy}
    //                           r={payload.day === today ? 6 : 3}
    //                           fill="#3b82f6"
    //                           stroke="white"
    //                           strokeWidth={2}
    //                         />
    //                       )}
    //                     />
    //                     <XAxis
    //                       dataKey="day"
    //                       axisLine={false}
    //                       tickLine={false}
    //                       tick={{ fontSize: 12, fill: "#666" }}
    //                       height={30}
    //                     />
    //                   </LineChart>
    //                 </ResponsiveContainer>
    //               ) : (
    //                 <p className="text-red-500 text-sm">No check-in data</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Learning Milestones */}
    //           <div>
    //             <h3 className="text-sm font-medium text-gray-700">
    //               Learning Milestones
    //             </h3>
    //             <div className="mt-3">
    //               {situation?.category_wise_avgs?.slice(0, 1).map((item, i) => (
    //                 <div key={i}>
    //                   <p className="text-xs text-gray-600 mb-1">
    //                     {item.category}
    //                   </p>
    //                   <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
    //                     <motion.div
    //                       className="h-3 bg-blue-500"
    //                       style={{ width: 0 }}
    //                       animate={{ width: `${Math.round(item.avg)}%` }}
    //                       transition={{ duration: 1 }}
    //                     />
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </motion.article>

    //     {/* Category Distribution Pie */}
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5, delay: 0.1 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-2 row-span-2 flex flex-col"
    //     >
    //       <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
    //         <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //           Category Performance Distribution
    //         </h2>

    //         <ResponsiveContainer width="100%" height={450}>
    //           <PieChart>
    //             <Pie
    //               data={categoryData}
    //               dataKey="value"
    //               nameKey="name"
    //               innerRadius={60}
    //               outerRadius={90}
    //               paddingAngle={3}
    //             >
    //               {categoryData.map((entry, index) => (
    //                 <Cell
    //                   key={`cell-${index}`}
    //                   fill={COLORS[index % COLORS.length]}
    //                 />
    //               ))}
    //             </Pie>
    //             <Tooltip />
    //             <Legend layout="horizontal" verticalAlign="bottom" align="center" />
    //           </PieChart>
    //         </ResponsiveContainer>


    //         <p className="text-sm text-gray-500 mt-3 text-center">
    //           Last Updated Avg Score: <span className="font-semibold">{overallScore}%</span>
    //         </p>
    //       </div>
    //     </motion.article>

    //     {/* Training Completion */}
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5, delay: 0.2 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-2"
    //     >
    //       <h2 className="text-lg font-semibold text-slate-800 mb-4">
    //         Management
    //       </h2>
    //       <p className="text-sm text-gray-500 mb-4">
    //         Training Progress & Behavioral Safety
    //       </p>





    //       {/* Training Completion (Soar Card Average) */}
    //       <div className="mb-6">
    //         <h3 className="text-sm font-medium text-gray-700">Training Completion</h3>
    //         <div className="mt-2">
    //           <div className="w-full bg-gray-200 rounded-full h-3">
    //             <motion.div
    //               className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-yellow-400"
    //               initial={{ width: 0 }}
    //               animate={{ width: `${overallScore}%` }}
    //               transition={{ duration: 1 }}
    //             />
    //           </div>
    //           <p className="text-xs text-gray-500 mt-1">
    //             {overallScore}% completed last 6 months
    //           </p>
    //         </div>
    //       </div>
    //     </motion.article>

    //     {/* Competency Trends */}
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5, delay: 0.3 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-4"
    //     >
    //       {/* Competency Trends (Bar Chart) */}
    //       <div className="mb-6">
    //         <h3 className="text-sm font-medium text-gray-700">Competency Trends</h3>
    //         <ResponsiveContainer width="100%" height={150}>
    //           <BarChart data={score}>
    //             <XAxis dataKey="month" tickLine={false} axisLine={false} />
    //             <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
    //           </BarChart>
    //         </ResponsiveContainer>
    //       </div>
    //     </motion.article>

    //     {/* Risk Indicators */}
    //     <motion.article
    //       initial={{ opacity: 0, y: 8 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5, delay: 0.4 }}
    //       className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-6"
    //     >
    //       {/* Behavioral Risk Indicators */}
    //       <div>
    //         <h3 className="text-sm font-medium text-gray-700 mb-3">
    //           Behavioral Risk Indicators
    //         </h3>
    //         {situation?.category_wise_avgs?.map((item, i) => (
    //           <div key={i} className="mb-3">
    //             <div className="flex justify-between text-xs">
    //               <span>{item.category}</span>
    //               <span>{Math.round(item.avg)}%</span>
    //             </div>
    //             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
    //               <motion.div
    //                 className="h-2 bg-emerald-500"
    //                 initial={{ width: 0 }}
    //                 animate={{ width: `${Math.round(item.avg)}%` }}
    //                 transition={{ duration: 1, delay: i * 0.1 }}
    //               />
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </motion.article>
    //   </div>
    // </section>

    <section className="px-4 py-6 max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-auto">
        {/* Left Big Card */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-4 row-span-2 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <p className="text-3xl text-gray-500 mb-6">
              {getGreeting()}, {user.sailor_name || "Sailor"}
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex flex-col items-center">
                <CircularProgress percentage={overallScore} size={140} strokeWidth={14} />
                <p className="mt-3 font-semibold text-gray-700 text-center text-sm">
                  Behavioral Competency Progress
                </p>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Learning Milestones</h3>
                  <div className="mt-3 space-y-2">
                    {situation?.category_wise_avgs?.slice(0, 1).map((item, i) => (
                      <div key={i}>
                        <p className="text-xs text-gray-600 mb-1">{item.category}</p>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-3 bg-blue-500"
                            style={{ width: 0 }}
                            animate={{ width: `${Math.round(item.avg)}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>



              </div>





            </div>


            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Emotional Trends <span className="text-xs text-gray-400">Last 7 days</span>
              </h3>
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chartData}>
                      <Area type="monotone" dataKey="value" stroke="none" fill="url(#waveGradient)" />
                      <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={({ cx, cy, payload }) => (
                          <circle cx={cx} cy={cy} r={payload.day === today ? 6 : 3} fill="#3b82f6" stroke="white" strokeWidth={2} />
                        )}
                      />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} height={30} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-red-500 text-sm">No check-in data</p>
                )}
              </div>
            </div>



          </div>
        </motion.article>

        {/* Management & Training */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-2 flex flex-col justify-between"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Management</h2>
          <p className="text-sm text-gray-500 mb-4">Training Progress & Behavioral Safety</p>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Training Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${overallScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{overallScore}% completed last 6 months</p>
          </div>
        </motion.article>

        {/* Category Pie Chart */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-2 row-span-2 w-full h-[100vh] flex flex-col justify-between overflow-hidden"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Performance Distribution</h2>
          <ResponsiveContainer width="100%" height={580}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Last Updated Avg Score: <span className="font-semibold">{overallScore}%</span>
          </p>
        </motion.article>



        {/* Competency Trends */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6 md:col-span-4 h-[50vh] flex flex-col justify-between"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-2">Competency Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={score}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.article>

        {/* Behavioral Risk Indicators */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6 col-span-6"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3">Behavioral Risk Indicators</h3>
          <div className="space-y-3">
            {uniqueCategories.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.category}</span>
                  <span>{Math.round(item.avg)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-2 bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(item.avg)}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default UserDashboard;
