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
//           if (foundUser) {
//             setUser(foundUser);
//           } else {
//             setErrorMsg("User not found");
//           }
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           setErrorMsg(err.response.data.error || "Something went wrong");
//         } else {
//           setErrorMsg("Server not responding");
//         }
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

//         const formattedScores = numericScores.map((s, index) => ({
//           month: (index + 1).toString(),
//           score: s,
//         }));
//         setScore(formattedScores);

//         const totalScore =
//           numericScores.length > 0
//             ? Math.round(
//               numericScores.reduce((a, b) => a + b, 0) / numericScores.length
//             )
//             : 0;

//         setOverallScore(totalScore);
//       })
//       .catch((err) => console.error("Error fetching soar card details:", err));
//   }, [email]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_DAILY_CHECK}${email}/`)
//       .then((res) => {
//         const formatted = res.data.map((item) => {
//           const day = new Date(item.date).toLocaleDateString("en-US", {
//             weekday: "short",
//           });
//           return { day, value: item.percentage };
//         });
//         setChartData(formatted);
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   }, [email]);

//   if (errorMsg)
//     return <p className="text-red-500 text-lg font-medium">{errorMsg}</p>;
//   if (!user)
//     return (
//       <p className="text-xl font-medium text-red-500">
//         Loading user details...
//       </p>
//     );

//   const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

//   return (
//     <div className="details-page p-6 ml-48">
//       <button
//         onClick={onBack}
//         className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//       >
//         Back
//       </button>
//       <h1 className="text-2xl font-bold mb-6">User Details</h1>

//       {/* User Info + Score */}
//       <div className="flex gap-10 items-start mb-10">
//         <div className="subcontainer-1 bg-white shadow-md rounded-lg p-6 w-[600px]">
//           <p>
//             <b>Name:</b> {user?.sailor_name || "N/A"}
//           </p>
//           <p>
//             <b>Email:</b> {user?.user_email || "N/A"}
//           </p>
//           <p>
//             <b>Age:</b> {user?.age ?? "N/A"}
//           </p>
//           <p>
//             <b>Company:</b> {user?.company || "N/A"}
//           </p>
//           <p>
//             <b>Rank:</b> {user?.rank || "N/A"}
//           </p>
//           <p>
//             <b>Experience (years):</b> {user?.experience_years ?? "N/A"}
//           </p>
//           <p>
//             <b>Home Location:</b> {user?.home_location || "N/A"}
//           </p>
//           <p>
//             <b>Spouse Name:</b> {user?.spouse_name || "N/A"}
//           </p>
//           <p>
//             <b>Hobbies:</b> {user?.hobbies || "N/A"}
//           </p>
//         </div>

//         <div className="score-card flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-[200px]">
//           <div className="w-32 h-32 rounded-full border-[10px] border-blue-500 flex items-center justify-center">
//             <h3 className="text-red-500 text-xl font-bold">{overallScore}</h3>
//           </div>
//           <p className="mt-3 font-semibold">Overall Score</p>
//         </div>
//       </div>

//       {/* Graphs Row */}
//       <div className="flex justify-between gap-8 mb-10">
//         {/* Daily Check-in */}
//         <div className="w-1/2 h-[320px] bg-white rounded-2xl p-5 shadow-md">
//           <h2 className="text-md font-bold mb-4">Daily Check-in</h2>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={260}>
//               <LineChart data={chartData}>
//                 <defs>
//                   <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
//                     <stop offset="25%" stopColor="#3b82f6" stopOpacity={0.4} />
//                     <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.3} />
//                     <stop offset="75%" stopColor="#3b82f6" stopOpacity={0.1} />
//                     <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>

//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 14, fill: "#666", dy: -5 }}
//                   interval={0}
//                   height={40}
//                 />

//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="none"
//                   fill="url(#waveGradient)"
//                   fillOpacity={0.4}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3b82f6"
//                   strokeWidth={3}
//                   dot={({ cx, cy, payload }) =>
//                     payload.day === today ? (
//                       <circle
//                         cx={cx}
//                         cy={cy}
//                         r={6}
//                         fill="#3b82f6"
//                         stroke="white"
//                         strokeWidth={2}
//                       />
//                     ) : (
//                       <circle
//                         cx={cx}
//                         cy={cy}
//                         r={3}
//                         fill="#3b82f6"
//                         stroke="white"
//                         strokeWidth={2}
//                       />
//                     )
//                   }
//                   activeDot={{ r: 0 }}
//                 />
//                 <Tooltip
//                   cursor={{ stroke: "transparent" }}
//                   contentStyle={{
//                     borderRadius: "8px",
//                     border: "none",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                   }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-md font-bold text-red-500">
//               No check-in data available
//             </p>
//           )}
//         </div>

//         {/* Soar Card */}
//         <div className="w-1/2 h-[320px] bg-white rounded-2xl p-5 shadow-md">
//           <h2 className="text-md font-bold mb-4">Soar Card (6 Months)</h2>
//           {score.length > 0 ? (
//             <ResponsiveContainer width="100%" height={260}>
//               <BarChart data={score}>
//                 <XAxis
//                   dataKey="month"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 14, fill: "#666" }}
//                   interval={0}
//                   height={40}
//                 />
//                 <Bar dataKey="score" fill="#3b82f6" radius={[5, 5, 0, 0]} />
//                 <Tooltip
//                   cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
//                   contentStyle={{
//                     borderRadius: "8px",
//                     border: "none",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                   }}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-red-500 font-bold">
//               No soar card data available
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Category Wise Averages */}
//       <div className="flex flex-col mt-10 w-full bg-white mx-auto">
//         <h1 className="text-xl font-bold text-center">Based on Domain</h1>
//         <div className=" rounded-2xl p-5 flex flex-wrap gap-6 shadow-md mx-auto">
//           {sistuvation?.category_wise_avgs?.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col bg-white shadow-lg p-6 rounded-lg w-[48%]"
//             >
//               <h1 className="text-xl font-semibold">{item.category}</h1>
//               <div className="flex items-center gap-3 mt-5">
//                 <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-4 ${item.avg > 0 ? "bg-blue-500" : "bg-gray-200"
//                       } transition-all duration-500`}
//                     style={{ width: `${Math.round(item.avg)}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">
//                   {item.avg > 0 ? `${Math.round(item.avg)}%` : "No Data"}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
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
import CircularProgress from "/src/Components/ReusableComponents/CircularProgress.jsx";
import { motion } from "framer-motion";

function UserCardDetails({ email, onBack }) {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [chartData, setChartData] = useState([]);
  const [sistuvation, setSistuvation] = useState([]);
  const [score, setScore] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOAR_CARD_URL}${email}/`)
      .then((res) => {
        setSistuvation(res.data);
        const fetchedScores = res.data.overall_avg || [];
        const numericScores = fetchedScores.map((s) => Number(s));
        setScore(
          numericScores.map((s, index) => ({ month: (index + 1).toString(), score: s }))
        );
        const totalScore =
          numericScores.length > 0
            ? Math.round(numericScores.reduce((a, b) => a + b, 0) / numericScores.length)
            : 0;
        setOverallScore(totalScore);
      })
      .catch((err) => console.error("Error fetching soar card details:", err));
  }, [email]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DAILY_CHECK}${email}/`)
      .then((res) => {
        setChartData(
          res.data.map((item) => ({
            day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
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

  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="details-page p-6 ">
      <button
        onClick={onBack}
        className="mb-6 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>

      {/* User Info + Overall Score */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-3">
          <p><span className="font-semibold text-gray-600">Name:</span> {user.sailor_name || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Email:</span> {user.user_email || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Age:</span> {user.age ?? "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Company:</span> {user.company || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Rank:</span> {user.rank || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Experience:</span> {user.experience_years ?? "N/A"} years</p>
          <p><span className="font-semibold text-gray-600">Home Location:</span> {user.home_location || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Spouse:</span> {user.spouse_name || "N/A"}</p>
          <p><span className="font-semibold text-gray-600">Hobbies:</span> {user.hobbies || "N/A"}</p>
        </div>

        <div className="w-1/4 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          {/* Circular Progress Component */}
          <CircularProgress
            percentage={overallScore}
            size={150}
            strokeWidth={15}
          />
          <p className="mt-3 font-semibold text-gray-700 text-center">
            Overall Soar Card Score
          </p>
        </div>
      </div>

      {/* Graphs Row */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Daily Check-in */}
        <div className="flex-1 bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Daily Check-in</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#666" }} height={40} />
                <Area type="monotone" dataKey="value" stroke="none" fill="url(#waveGradient)" fillOpacity={0.4} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3}
                  dot={({ cx, cy, payload }) => (
                    <circle
                      cx={cx} cy={cy} r={payload.day === today ? 6 : 3}
                      fill="#3b82f6" stroke="white" strokeWidth={2} />
                  )}
                />
                <Tooltip cursor={{ stroke: "transparent" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-red-500 font-medium">No check-in data available</p>
          )}
        </div>

        {/* Soar Card */}
        <div className="flex-1 bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Soar Card (6 Months)</h2>
          {score.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={score}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#666" }} height={40} />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Tooltip cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-red-500 font-medium">No soar card data available</p>
          )}
        </div>
      </div>

      {/* Category Wise Averages */}
      <div className="bg-white rounded-2xl p-6 mb-10 shadow-md">
        <h1 className="text-xl font-bold text-center mb-6">Based on Domain</h1>

        {sistuvation?.category_wise_avgs && sistuvation.category_wise_avgs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sistuvation.category_wise_avgs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-5 shadow-inner"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.01 }}
                viewport={{ once: true, amount: 0 }}
              >
                <h2 className="text-lg font-semibold">{item.category}</h2>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-4 ${item.avg > 0 ? "bg-blue-500" : "bg-gray-200"}`}
                      style={{ width: 0 }}
                      animate={{ width: `${Math.round(item.avg)}%` }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    ></motion.div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.avg > 0 ? `${Math.round(item.avg)}%` : "No Data"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 font-medium mt-4">
            No domain-based data available
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCardDetails;
