// import { useState } from "react";
// import Modal from "/src/Components/ReusableComponents/Modal.jsx";

// const AI_Feed = () => {
//   const [fileInput, setFileInput] = useState(null);
//   const [uploading, setUploading] = useState("Upload");
//   const [feed_cat, setFeed_cat] = useState("");
//   const [isModal, setIsModal] = useState(false);
//   const [status, setStatus] = useState("");

//   const quizCategory = [
//     "Result Focus (Professional Development & Compliance)",
//     "Leadership",
//     "Stress Management",
//     "Crew Relationship",
//     "Help-Seeking",
//     "Empathy",
//     "Command Pressure",
//   ];

//   const handleFile = (e) => {
//     setFileInput(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!fileInput || !feed_cat) {
//       alert("Please select a file and a category!");
//       return;
//     }

//     setUploading("Uploading...");
//     try {
//       const formData = new FormData();
//       formData.append("document", fileInput);
//       formData.append("category", feed_cat);

//       const response = await fetch(
//         "https://strivehigh.thirdvizion.com/api/documentuplod/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Invalid request");
//       }

//       setIsModal(true);
//       setStatus("Upload Successful!");
//       setUploading("Upload");
//       setFileInput(null);
//       setFeed_cat("");
//     } catch (error) {
//       setIsModal(true);
//       console.error("Something went wrong", error);
//       setStatus("Upload failed");
//       setUploading("Upload");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <h1 className="text-center font-semibold text-4xl mb-10">AI Content</h1>

//       <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <div className="flex flex-col gap-2 mb-6">
//           <label className="font-medium text-lg">Select Category</label>
//           <select
//             className="p-2 border rounded-md"
//             value={feed_cat}
//             onChange={(e) => setFeed_cat(e.target.value)}
//           >
//             <option value="">Choose Your Category</option>
//             {quizCategory.map((item, index) => (
//               <option key={index} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col items-center gap-4">
//           <label className="text-2xl font-semibold">Upload Your File</label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="w-full border border-dashed border-blue-500 p-3 rounded-md"
//             onChange={handleFile}
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//             // label={uploading}
//             onClick={handleUpload}
//           >Upload</button>
//         </div>
//       </div>

//       {isModal && (
//         <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
//           <div className="bg-white p-6 rounded-lg w-[400px]">
//             <h2 className="text-xl font-bold mb-4 text-center">{status}</h2>
//             <div className="flex items-center justify-center">
//               <Button
//                 className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
//                 label="OK"
//                 onClick={() => setIsModal(false)}
//               />
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AI_Feed;




import { useState } from "react";
import Modal from "/src/Components/ReusableComponents/Modal.jsx";

const AiContent = () => {
  const [fileInput, setFileInput] = useState(null);
  const [uploading, setUploading] = useState("Upload");
  const [feed_cat, setFeed_cat] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [status, setStatus] = useState("");

  const quizCategory = [
    "Result Focus (Professional Development & Compliance)",
    "Leadership",
    "Stress Management",
    "Crew Relationship",
    "Help-Seeking",
    "Empathy",
    "Command Pressure",
  ];

  const handleFile = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!fileInput || !feed_cat) {
      alert("Please select a file and a category!");
      return;
    }

    setUploading("Uploading...");
    try {
      const formData = new FormData();
      formData.append("document", fileInput);
      formData.append("category", feed_cat);

      const response = await fetch(
        "https://strivehigh.thirdvizion.com/api/documentuplod/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Invalid request");

      setIsModal(true);
      setStatus("Upload Successful!");
      setUploading("Upload");
      setFileInput(null);
      setFeed_cat("");
    } catch (error) {
      setIsModal(true);
      console.error("Something went wrong", error);
      setStatus("Upload failed");
      setUploading("Upload");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <h1 className="text-center font-bold text-4xl text-gray-800 mb-12">
        AI Content Upload
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Category Selector */}
        <div className="flex flex-col gap-3 mb-8">
          <label className="font-semibold text-gray-700 text-lg">
            Select Category
          </label>
          <select
            className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-gray-50 hover:bg-gray-100"
            value={feed_cat}
            onChange={(e) => setFeed_cat(e.target.value)}
          >
            <option value="">Choose Your Category</option>
            {quizCategory.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-3 text-center">
              Upload Your File
            </label>
            <label className="flex flex-col items-center justify-center w-full h-[30vh] p-6 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <span className="text-gray-600 text-sm">
                Drag & drop or click to browse
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFile}
              />
            </label>
            {fileInput && (
              <p className="text-sm mt-2 text-green-700 font-medium text-center">
                {fileInput.name}
              </p>
            )}
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          >
            {uploading}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModal && (
        <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${status.includes("Successful")
                ? "text-green-600"
                : "text-red-500"
                }`}
            >
              {status}
            </h2>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
              onClick={() => setIsModal(false)}
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AiContent;
