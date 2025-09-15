import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
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

function UserDetails() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [chartData, setChartData] = useState([]);
  const [score, setScore] = useState([]); // will be used for bar chart and score card
  const [overallScore, setOverallScore] = useState(0); // for score card
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_USER_API}?email=${email}`)
      .then((res) => {
        if (res.data && !Array.isArray(res.data)) {
          setUser(res.data);
        }

        // If API returns an array
        if (Array.isArray(res.data)) {
          const foundUser = res.data.find(
            (u) => u.user_email?.toLowerCase() === email.toLowerCase()
          );
          if (foundUser) {
            setUser(foundUser);
          } else {
            setErrorMsg("User not found");
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrorMsg(err.response.data.error || "Something went wrong");
        } else {
          setErrorMsg("Server not responding");
        }
        console.error("Error fetching user:", err);
      });
  }, [email]);

  // Fetch soar card details (for bar chart and score card)
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_SOAR_CARD_URL}${email}/`)
    .then((res) => {
      console.log("The SoarCard", res.data);

      const fetchedScores = res.data.overall_avg || [];

      // Convert string values to numbers
      const numericScores = fetchedScores.map((s) => Number(s));

      const formattedScores = numericScores.map((s, index) => ({
        month: (index + 1).toString(),
        score: s,
      }));
      setScore(formattedScores);

      // Set the score for the circular score card (average of all)
      const totalScore =
        numericScores.length > 0
          ? Math.round(
              numericScores.reduce((a, b) => a + b, 0) / numericScores.length
            )
          : 0;

      setOverallScore(totalScore);
    })
    .catch((err) => console.error("Error fetching soar card details:", err));
}, [email]);

  // Fetch chart data for daily check-ins
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DAILY_CHECK}${email}/`)
      .then((res) => {
        const formatted = res.data.map((item) => {
          const day = new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          });
          return { day, value: item.percentage };
        });
        setChartData(formatted);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  }, [email]);

  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;
  if (!user) return <p className="text-xl font-medium text-red-500">Loading user details...</p>;

  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>User Details</h1>

      <div className="userdetail-container">
        {/* Left side - User details */}
        <div className="subcontainer-1">
          <p><b>Name:</b> {user?.sailor_name || "N/A"}</p>
          <p><b>Email:</b> {user?.user_email || "N/A"}</p>
          <p><b>Age:</b> {user?.age ?? "N/A"}</p>
          <p><b>Company:</b> {user?.company || "N/A"}</p>
          <p><b>Rank:</b> {user?.rank || "N/A"}</p>
          <p><b>Experience (years):</b> {user?.experience_years ?? "N/A"}</p>
          <p><b>Home Location:</b> {user?.home_location || "N/A"}</p>
          <p><b>Spouse Name:</b> {user?.spouse_name || "N/A"}</p>
          <p><b>Hobbies:</b> {user?.hobbies || "N/A"}</p>
        </div>

        {/* Right side - Score card */}
        <div className="score-card">
          <div className="w-32 h-32 rounded-full border-[10px] border-blue-800 flex items-center justify-center">
            <h3 className="text-red-500 text-xl font-bold">{overallScore}</h3>
          </div>
        </div>

        <div className="-ml-20 flex justify-around items-center gap-10">
          {/* Daily Check-in Line Chart */}
          <div className="w-[550px] h-[300px] bg-white rounded-2xl p-5 relative">
            <h2 className="text-md font-bold">Daily Check-in</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                      <stop offset="25%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="75%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="waveShadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e40af" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: "#666", dy: -5 }}
                    padding={{ left: 20, right: 20 }}
                    interval={0}
                    height={40}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fill="url(#waveShadow)"
                    fillOpacity={0.6}
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fill="url(#waveGradient)"
                    isAnimationActive={true}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={({ cx, cy, payload }) => {
                      if (payload.day === today) {
                        return (
                          <>
                            <rect
                              x={cx - 10}
                              y={cy}
                              width={20}
                              height={200 - cy}
                              fill="url(#waveGradient)"
                              rx={10}
                            />
                            <circle
                              cx={cx}
                              cy={cy}
                              r={6}
                              fill="#3b82f6"
                              stroke="white"
                              strokeWidth={2}
                            />
                          </>
                        );
                      }
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={3}
                          fill="#3b82f6"
                          stroke="white"
                          strokeWidth={2}
                        />
                      );
                    }}
                    activeDot={{ r: 0 }}
                  />

                  <Tooltip
                    cursor={{ stroke: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-md font-bold text-red-500">No check-in data available</p>
            )}
          </div>

          {/* Soar Card Bar Chart */}
          <div className="w-[550px] h-[300px] bg-white rounded-2xl p-5 relative">
            <h2 className="text-md font-bold">Soar Card (6 Months)</h2>
            {score.length > 0 ? (
              <ResponsiveContainer width="15%" height={280}>
                <BarChart data={score}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: "#666" }}
                    interval={0}
                    height={40}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                  <Tooltip
                    cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className=" text-red-500 font-bold">No soar card data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
