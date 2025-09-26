// import React, { useState } from "react";
// import { BookOpenText, Unlock, Lock } from "lucide-react";

// export default function CourseContent() {
//   const Content = {
//     name: "Frontend Course",
//     chapters: [
//       {
//         id: 1,
//         title: "Chapter 1 - Introduction",
//         materials: [
//           {
//             material_name: "Intro Material",
//             material: `
// Chatbot Integration – Trainer & CEO Video Section

// 🔸 Step 1: Introduction Prompt
// Chatbot:
// You’ve heard how loneliness feels.
// Now let’s hear from someone who understands both the sea—and you.
// 👨‍🏫 Let’s hear what our trainer has to say about loneliness.
// 👉 [Play Trainer Message]

// 🔸 Step 2: Trainer Video Segment
// (Embed or autoplay trainer video)
// 🎥 (Embed video link or LMS video element)
// Alt Text: Trainer shares insights on managing loneliness and staying connected onboard.
// After the video:
// Chatbot:
// That was powerful. Would you like to hear a message from our CEO about this?
// 👉 [Yes, CEO Message] | [Not now]

// 🔸 Step 3: CEO Message Segment
// Chatbot:
// 💼 Here’s a message from our CEO—a voice of support from the top.
// Let’s take a moment to hear their thoughts.
// 🎥 CEO Speech – [ADD VIDEO LINK]
// (Or embed directly in LMS/chatbot platform)

// 🔸 Step 4: Reflection Option
// Chatbot:
// What stood out to you most from the videos?
// 👉 [I felt understood] | [I liked the advice] | [It made me reflect]
// Would you like to write down your thoughts or feelings?
// 👉 [Yes, journal entry] | [Skip]
//             `,
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: "Chapter 2 - Participant Reflections",
//         materials: [
//           {
//             material_name: "Participant Reflections",
//             material: `
// Some of the expected Answers from participants side:
// 1. "Yes, especially during long voyages when days feel like they’re all the same."
// 2. "Sometimes. Even with people around, it can feel really quiet inside."
// 3. "Not always, but there are moments when the silence hits harder than the waves."
// 4. "Yeah, especially when I miss home and can’t talk to my family."
// 5. "I’ve felt it during night watches—just me, the sea, and my thoughts."
// 6. "It’s part of the job sometimes, but it still catches me off guard."
// 7. "I try to stay busy, but yes—there are lonely moments for sure."

// 🟢 Step 1: Ask the Question
// Chatbot:
// Have you experienced this kind of loneliness before?
// 👉 [Yes] | [Sometimes] | [Not Really]

// 🟢 Step 2: Participant Reflection (Simulated Free Responses)
// If user selects Yes or Sometimes, show expected relatable answers:
// Chatbot:
// Thanks for sharing. You’re not alone in this. Here’s what others at sea have said:
// 🗨
// 1. "Yes, especially during long voyages when days feel like they’re all the same."
// 2. "Even with people around, it can feel really quiet inside."
// 3. "It’s part of the job, but the silence sometimes hits harder than the waves."
// 4. "I miss home most when I can’t speak to my family."

// Chatbot:
// Do any of these sound like your experience?
// 👉 [Yes, very much] | [Somewhat] | [No, mine is different]
//             `,
//           },
//         ],
//       },
//     ],
//   };

//   const [selectedChapterId, setSelectedChapterId] = useState(Content.chapters[0].id);
//   const [selectedMaterial, setSelectedMaterial] = useState(Content.chapters[0].materials[0].material);
//   const [completedChapters, setCompletedChapters] = useState([]);
//   const [unlockedChapters, setUnlockedChapters] = useState([0]); // index-based unlock
//   const [scrollCompleted, setScrollCompleted] = useState(false);

//   const chapterIndex = Content.chapters.findIndex((ch) => ch.id === selectedChapterId);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollTop + clientHeight >= scrollHeight - 5) {
//       setScrollCompleted(true);
//     }
//   };

//   const unlockNextChapter = () => {
//     const newCompleted = [...completedChapters, selectedChapterId];
//     setCompletedChapters(newCompleted);

//     const nextIndex = chapterIndex + 1;
//     if (nextIndex < Content.chapters.length && !unlockedChapters.includes(nextIndex)) {
//       setUnlockedChapters([...unlockedChapters, nextIndex]);
//     }

//     if (nextIndex < Content.chapters.length) {
//       setSelectedChapterId(Content.chapters[nextIndex].id);
//       setSelectedMaterial(Content.chapters[nextIndex].materials[0].material);
//       setScrollCompleted(false);
//     }
//   };

//   const completeLastChapter = () => {
//     if (!completedChapters.includes(selectedChapterId)) {
//       const newCompleted = [...completedChapters, selectedChapterId];
//       setCompletedChapters(newCompleted);
//     }
//   };

//   // ✅ Progress calculation (capped at 100%)
//   const progressPercent = Math.min(
//     100,
//     Math.round((completedChapters.length / Content.chapters.length) * 100)
//   );

//   const allChaptersCompleted = completedChapters.length === Content.chapters.length;

//   return (
//     <div className="flex min-h-screen bg-gray-100 ml-48">
//       {/* Sidebar */}
//       <aside className="w-96 p-4 bg-white border-r border-gray-300 h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4 flex items-center">
//           <BookOpenText className="mr-2 text-blue-400" /> Course Content
//         </h2>
//         {Content.chapters.map((chapter, index) => {
//           const isUnlocked = unlockedChapters.includes(index);
//           return (
//             <div
//               key={chapter.id}
//               className={`mb-2 border rounded-lg ${!isUnlocked ? "opacity-50 pointer-events-none" : "hover:border-blue-400"
//                 }`}
//             >
//               <div
//                 className="px-4 py-2 cursor-pointer flex items-center"
//                 onClick={() => isUnlocked && setSelectedChapterId(chapter.id)}
//               >
//                 {isUnlocked ? (
//                   <Unlock className="text-blue-400 mr-2" />
//                 ) : (
//                   <Lock className="text-gray-400 mr-2" />
//                 )}
//                 {chapter.title}
//               </div>
//             </div>
//           );
//         })}

//         {/* Progress */}
//         <div className="mt-6">
//           <div className="text-sm text-gray-600 mb-1 flex items-center">Progress</div>
//           <div className="relative h-4 bg-gray-300 rounded overflow-hidden">
//             <div
//               className="absolute top-0 left-0 h-full bg-blue-400 transition-all"
//               style={{ width: `${progressPercent}%` }}
//             ></div>
//           </div>
//           <div className="text-xs text-gray-400 mt-1">{progressPercent}% Completed</div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div
//           className="bg-white p-6 rounded shadow h-[80vh] overflow-y-auto whitespace-pre-line"
//           onScroll={handleScroll}
//         >
//           <h2 className="text-xl font-bold mb-4">{Content.chapters[chapterIndex].title}</h2>
//           <p className="text-gray-800">{selectedMaterial}</p>
//         </div>

//         {scrollCompleted && (
//           <div className="mt-4 flex justify-end space-x-4">
//             {/* Show Unlock Next Chapter for all except last chapter */}
//             {chapterIndex < Content.chapters.length - 1 ? (
//               <button
//                 className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
//                 onClick={unlockNextChapter}
//               >
//                 Unlock Next Chapter
//               </button>
//             ) : (
//               <>
//                 {/* Last chapter -> Complete Chapter */}
//                 <button
//                   className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
//                   onClick={completeLastChapter}
//                 >
//                   Complete Chapter
//                 </button>

//                 {/* Show Certificate Button only when all chapters are completed */}
//                 {allChaptersCompleted && (
//                   <button
//                     className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
//                     onClick={() => alert("🎉 Congratulations! Here is your certificate.")}
//                   >
//                     Get Certificate
//                   </button>
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



const Content = {
  name: "Loneliness Chatbot Journey",
  description:
    "A structured course designed to help seafarers understand and cope with loneliness at sea through stories, expert messages, reflections, and strategies.",
  chapters: [
    {
      id: 1,
      title: "Chapter 1 - Loneliness at Sea",
      materials: [
        {
          material_name: "Introduction",
          material: `
Welcome to this course on Loneliness at Sea.  

Loneliness is a common challenge faced by seafarers. In this chapter, we explore the emotional impact of isolation and begin by reflecting on personal experiences.
          `,
        },
        {
          material_name: "Poem & Reflection",
          material: `
Still Waters, Strong Heart  

Alone you stand where oceans meet,  
Yet echoes of love your heart still greet.  
The stars above, your silent guide,  
With every wave, we’re by your side.  

Reflection Question:  
- What emotions or memories does this poem bring to mind?
          `,
        },
      ],
      quiz: [
        {
          question: "What is one common emotional challenge for seafarers?",
          options: [
            "Physical injury",
            "Loneliness",
            "Lack of food",
            "Navigation errors",
          ],
          answer: "Loneliness",
        },
      ],
    },
    {
      id: 2,
      title: "Chapter 2 - Trainer & CEO Messages",
      materials: [
        {
          material_name: "Trainer Message",
          material: `
In this section, you will hear from a trainer who shares insights on recognizing and addressing loneliness at sea.  
Watch the trainer video and note key strategies mentioned.
          `,
        },
        {
          material_name: "CEO Message",
          material: `
Leadership plays an important role in supporting seafarers.  
Here is a CEO message offering encouragement and organizational support.  
Watch the CEO speech and reflect on how leadership values impact seafarers’ well-being.
          `,
        },
      ],
      quiz: [
        {
          question:
            "Why is leadership support important in addressing loneliness at sea?",
          options: [
            "It reduces technical errors",
            "It provides encouragement and validation",
            "It prevents ship delays",
            "It improves navigation speed",
          ],
          answer: "It provides encouragement and validation",
        },
      ],
    },
    {
      id: 3,
      title: "Chapter 3 - Participant Reflections",
      materials: [
        {
          material_name: "Shared Reflections",
          material: `
Seafarers from across the world share their thoughts on loneliness:  

1. "During long voyages, every day feels the same."  
2. "Even surrounded by people, I sometimes feel alone."  
3. "Silence at sea can be harder than rough waters."  
4. "I miss home when communication is limited."  

Reflection Question:  
- Which of these reflections resonates most with your experience?
          `,
        },
      ],
      quiz: [
        {
          question: "Which of the following is a common reflection shared by seafarers?",
          options: [
            "They never feel lonely at sea",
            "They miss home during long voyages",
            "They enjoy complete silence always",
            "They prefer no communication with family",
          ],
          answer: "They miss home during long voyages",
        },
      ],
    },
    {
      id: 4,
      title: "Chapter 4 - Coping Strategies",
      materials: [
        {
          material_name: "Practical Strategies",
          material: `
Here are practical strategies to cope with loneliness:  

1. Spend time with others at shared spaces.  
2. Personalize your cabin with photos, quotes, or soft lighting.  
3. Use music to stay connected with home.  
4. Be supportive of colleagues, even in small ways.  
5. Maintain a journal to express your feelings.  
6. Build simple routines that provide structure.  
7. Reach out for support before stress builds up.  
8. Foster respect and inclusivity across cultures onboard.
          `,
        },
      ],
      quiz: [
        {
          question: "Which of these is NOT listed as a coping strategy?",
          options: [
            "Creating playlists",
            "Writing in a journal",
            "Ignoring colleagues",
            "Personalizing your cabin",
          ],
          answer: "Ignoring colleagues",
        },
      ],
    },
    {
      id: 5,
      title: "Chapter 5 - Moving Forward",
      materials: [
        {
          material_name: "Summary & Next Steps",
          material: `
As we conclude this course:  

- Loneliness, homesickness, anxiety, and burnout are part of seafarer life.  
- Recognizing emotions is the first step in managing them.  
- Use coping strategies consistently.  
- Leadership and peer support can make a significant difference.  

Reflection Questions:  
- When during the day do you feel most lonely?  
- What helps you feel more connected?
          `,
        },
      ],
      quiz: [
        {
          question: "What is the first step in managing loneliness?",
          options: [
            "Ignoring emotions",
            "Recognizing emotions",
            "Working longer hours",
            "Avoiding colleagues",
          ],
          answer: "Recognizing emotions",
        },
      ],
    },
  ],
};

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronLeft, Unlock, Lock } from "lucide-react";
import Logo from "/src/assets/Logo/Ai logo-22.png";
import lonelinessImage from "/src/assets/image/course_image.jpeg";
import vedio1 from "/src/assets/BlogVideo/vedio1.mp4"; // 👈 your video
// import Content from "/src/Pages/CourseContent.jsx";

export default function CourseContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [unlockedChapters, setUnlockedChapters] = useState([0]);
  const [scrollCompleted, setScrollCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const containerRef = useRef(null);

  const selectedChapter = Content.chapters[chapterIndex] || Content.chapters[0];
  const selectedMaterial = selectedChapter?.materials?.[0]?.material ?? "";

  // Reset scroll + check if content fits
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setScrollCompleted(false);
    const t = setTimeout(() => {
      if (el.scrollHeight <= el.clientHeight + 5) {
        setScrollCompleted(true);
      }
    }, 40);
    return () => clearTimeout(t);
  }, [chapterIndex, selectedMaterial, showCertificate]);

  const handleChangeChapter = (newIndex) => {
    if (unlockedChapters.includes(newIndex)) {
      setChapterIndex(newIndex);
      setShowCertificate(false);
      setScrollCompleted(false);
      const el = containerRef.current;
      if (el) el.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      setScrollCompleted(true);
    }
  };

  const unlockNextChapter = () => {
    setCompletedChapters((prev) =>
      prev.includes(chapterIndex) ? prev : [...prev, chapterIndex]
    );
    const nextIndex = chapterIndex + 1;
    if (nextIndex < Content.chapters.length) {
      setUnlockedChapters((prev) =>
        prev.includes(nextIndex) ? prev : [...prev, nextIndex]
      );
      setChapterIndex(nextIndex);
    } else {
      setShowCertificate(true);
    }
  };

  const completeLastChapter = () => {
    setCompletedChapters((prev) =>
      prev.includes(chapterIndex) ? prev : [...prev, chapterIndex]
    );
    setShowCertificate(true);
  };

  const progressPercent = Math.min(
    100,
    Math.round((new Set(completedChapters).size / Content.chapters.length) * 100)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Overlay (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`p-4 bg-white border-r border-gray-300 flex flex-col fixed md:relative top-15 md:top-0 left-0 z-20 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${isSidebarMinimized ? "w-20" : "w-80 md:w-60"} h-full`}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center ${isSidebarMinimized ? "md:justify-center" : ""
              }`}
          >
            <img
              src={Logo}
              alt="Logo"
              className={`size-10 text-blue-400 ${isSidebarMinimized ? "ml-1" : "mr-2"
                }`}
            />
            {!isSidebarMinimized && (
              <h2 className="text-xl font-bold">Strive High</h2>
            )}
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {!isSidebarMinimized && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">
              Progress: {progressPercent}%
            </p>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {Content.chapters.map((chapter, index) => {
            const isUnlocked = unlockedChapters.includes(index);
            const isCompleted = completedChapters.includes(index);
            return (
              <div
                key={chapter.id}
                className={`mb-2 border rounded-lg transition
                  ${isUnlocked
                    ? "hover:border-blue-400 hover:bg-blue-50"
                    : "opacity-50 pointer-events-none"
                  }
                  ${chapterIndex === index
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300"
                  }`}
                onClick={() => isUnlocked && handleChangeChapter(index)}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  {isUnlocked ? (
                    <Unlock
                      className={`text-blue-400 ${isSidebarMinimized ? "" : "mr-2"
                        }`}
                    />
                  ) : (
                    <Lock
                      className={`text-gray-400 ${isSidebarMinimized ? "" : "mr-2"
                        }`}
                    />
                  )}
                  {!isSidebarMinimized && <span>{chapter.title}</span>}
                  {isCompleted && (
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setIsSidebarMinimized((s) => !s)}
          className="hidden md:flex absolute -right-4 top-10  bg-white border rounded-full p-1.5 hover:bg-gray-100"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${isSidebarMinimized ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-start md:justify-center p-4 border-b bg-white">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 mr-3 md:hidden"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl text-center font-bold text-gray-700">{Content.name}</h1>
          </div>
        </header>

        <div
          id="scrollable-content"
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="bg-white p-6 rounded-lg shadow-md whitespace-pre-line break-words">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedChapter.title}
            </h2>

            <img
              src={lonelinessImage}
              alt="Loneliness"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {showCertificate ? (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                  🎉 Certificate of Completion 🎉
                </h1>
                <p className="text-lg">
                  Congratulations! You have completed the <strong>{Content.name}</strong>.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-800 leading-relaxed mb-6">{selectedMaterial}</p>

                {/* Video below the content */}
                <video src={vedio1} controls className="w-full rounded-lg mb-6" />
              </>
            )}
          </div>
        </div>

        {!showCertificate && (
          <div className="w-full flex justify-center space-x-4 p-4 bg-gray-100 border-t">
            {scrollCompleted ? (
              chapterIndex < Content.chapters.length - 1 ? (
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
                  onClick={unlockNextChapter}
                >
                  Unlock Next Chapter
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                  onClick={completeLastChapter}
                >
                  Complete Chapter & Get Certificate
                </button>
              )
            ) : (
              <div className="text-sm text-gray-600">Scroll to the bottom to unlock.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}