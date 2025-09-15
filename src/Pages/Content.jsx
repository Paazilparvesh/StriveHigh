import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Content() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_USER_API)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Server Error:", error);
        if (error.response) {
          setErrorMsg(error.response.data.error || "Something went wrong");
        } else if (error.request) {
          setErrorMsg("No response from server");
        } else {
          setErrorMsg(error.message);
        }
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="overflow-hidden">
      <h1 className="text-4xl text-center mt-14 font-medium">User Details</h1>
      <div className="search-box">
        <h2 style={{ textAlign: "center" }}>Total users: {users.length}</h2>
        <div className="search_container">
          <input
            type="text"
            placeholder="Search "
            className="border p-3 rounded-lg w-[350px] placeholder-gray-500"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (query === "") {
                axios.get(import.meta.env.VITE_USER_API)
                  .then((res) => {
                    setUsers(res.data)
                  })
                  .catch((err) => console.error("Error fetching users:", err));
              } else {
                const filtered = users.filter(
                  (user) =>
                    user.sailor_name.toLowerCase().includes(query) ||
                    user.user_email.toLowerCase().includes(query)
                );
                setUsers(filtered);
              }
            }}
          />
        </div>
      </div>
      <div className="container">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              onClick={() => navigate(`/user/${user.user_email}`)}
              className="card"
            >
              <h2>{user.sailor_name}</h2>
              <p>{user.user_email}</p>

              <div className="meter">
                <div className="meter-border"></div>
                {Array.isArray(user.Avgs) && user.Avgs.length > 0 ? (
                  <h4>{Math.round(user.Avgs[user.Avgs.length - 1])}</h4>
                ) : (
                  <h4 className="text-red-500 font-medium text-md">No score</h4>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-red-500 mt-10">No users found</p>
        )}
      </div>
    </div>
  );
}
export default Content;
