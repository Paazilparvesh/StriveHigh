// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Content() {
//   const [users, setUsers] = useState([]);
//   const [setErrorMsg] = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_USER_API)
//       .then((res) => {
//         setUsers(res.data);
//       })
//       .catch((error) => {
//         console.error("Server Error:", error);
//         if (error.response) {
//           setErrorMsg(error.response.data.error || "Something went wrong");
//         } else if (error.request) {
//           setErrorMsg("No response from server");
//         } else {
//           setErrorMsg(error.message);
//         }
//         console.error("Error fetching user:", error);
//       });
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <h1 className="text-4xl text-center mt-14 font-medium">User Details</h1>
//       <div className="search-box">
//         <h2 style={{ textAlign: "center" }}>Total users: {users.length}</h2>
//         <div className="search_container">
//           <input
//             type="text"
//             placeholder="Search "
//             className="border p-3 rounded-lg w-[350px] placeholder-gray-500"
//             onChange={(e) => {
//               const query = e.target.value.toLowerCase();
//               if (query === "") {
//                 axios.get(import.meta.env.VITE_USER_API)
//                   .then((res) => {
//                     setUsers(res.data)
//                   })
//                   .catch((err) => console.error("Error fetching users:", err));
//               } else {
//                 const filtered = users.filter(
//                   (user) =>
//                     user.sailor_name.toLowerCase().includes(query) ||
//                     user.user_email.toLowerCase().includes(query)
//                 );
//                 setUsers(filtered);
//               }
//             }}
//           />
//         </div>
//       </div>
//       <div className="container">
//         {users.length > 0 ? (
//           users.map((user, index) => (
//             <div
//               key={index}
//               onClick={() => navigate(`/user/${user.user_email}`)}
//               className="card"
//             >
//               <h2>{user.sailor_name}</h2>
//               <p>{user.user_email}</p>

//               <div className="meter">
//                 <div className="meter-border"></div>
//                 {Array.isArray(user.Avgs) && user.Avgs.length > 0 ? (
//                   <h4>{Math.round(user.Avgs[user.Avgs.length - 1])}</h4>
//                 ) : (
//                   <h4 className="text-red-500 font-medium text-md">No score</h4>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-2xl text-red-500 mt-10">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Content;

import axios from "axios";
import { useEffect, useState } from "react";
import UserCardDetail from '/src/Components/AdminComponents/UserComponent/UserCardDetail.jsx';
import CircularProgress from "/src/Components/ReusableComponents/CircularProgress.jsx";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [setErrorMsg] = useState();

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

  // Search filter
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === "") {
      axios
        .get(import.meta.env.VITE_USER_API)
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err));
    } else {
      const filtered = users.filter(
        (user) =>
          user.sailor_name.toLowerCase().includes(query) ||
          user.user_email.toLowerCase().includes(query)
      );
      setUsers(filtered);
    }
  };

  if (selectedEmail) {
    return (
      <UserCardDetail
        email={selectedEmail}
        onBack={() => setSelectedEmail(null)}
      />
    );
  }

  return (
    <div className="overflow-hidden">
      <h1 className="text-4xl text-center mt-4 font-medium">User Details</h1>
      {/* Total users and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 px-2 md:px-5 mt-10">
        <h2 className="text-lg font-medium text-gray-700 mb-2 md:mb-0">
          Total users: <span className="font-bold">{users.length}</span>
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded-lg p-2 md:p-3 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition"
          onChange={handleSearch}
        />
      </div>
      {/* User Details */}
      {/* <div className="flex flex-wrap justify-center items-start gap-6 p-5 mb-20 w-full min-h-screen ">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              onClick={() => setSelectedEmail(user.user_email)}
              className="card flex flex-col "
            >
              <h2>{user.sailor_name}</h2>
              <p>{user.user_email}</p>

              <div className="mt-10">
                {Array.isArray(user.Avgs) && user.Avgs.length > 0 ? (
                  <CircularProgress percentage={Math.round(user.Avgs[user.Avgs.length - 1])} size={150} strokeWidth = {15} />
                ) : (
                  <h4 className="text-red-500 font-medium text-md">No score</h4>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-red-500 mt-10">No users found</p>
        )}
      </div> */}
      <div className="flex flex-wrap justify-center items-start gap-6 p-5 mb-20 w-full min-h-screen">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              onClick={() => setSelectedEmail(user.user_email)}
              className="bg-white shadow-lg rounded-2xl p-6 w-64 md:w-72 cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]"
            >
              {/* Header: Name and Email */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{user.sailor_name}</h2>
                <p className="text-sm text-gray-500 truncate">{user.user_email}</p>
              </div>

              {/* Progress title */}
              <h3 className="text-md font-medium text-gray-600 text-center mb-2">Soar Card</h3>

              {/* Circular progress */}
              <div className="flex justify-center mt-2">
                {Array.isArray(user.Avgs) && user.Avgs.length > 0 ? (
                  <CircularProgress
                    percentage={Math.round(user.Avgs[user.Avgs.length - 1])}
                    size={140}
                    strokeWidth={12}
                  />
                ) : (
                  <h4 className="text-red-500 font-medium text-md mt-2 text-center">No score</h4>
                )}
              </div>

              {/* Footer: Optional extra info */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-400">Last updated</p>
                {Array.isArray(user.Avgs) && user.Avgs.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {Math.round(user.Avgs[user.Avgs.length - 1])}%
                  </span>
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
export default UserDetails;
