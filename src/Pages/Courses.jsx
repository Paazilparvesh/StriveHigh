import React, { useState } from "react";
import { BookOpenText, Unlock, Lock } from "lucide-react";

export default function CourseContent() {
  const Content = {
    name: "Frontend Course",
    chapters: [
      {
        id: 1,
        title: "Chapter 1 - Introduction",
        materials: [
          {
            material_name: "Intro Material",
            material: `
Chatbot Integration – Trainer & CEO Video Section

🔸 Step 1: Introduction Prompt
Chatbot:
You’ve heard how loneliness feels.
Now let’s hear from someone who understands both the sea—and you.
👨‍🏫 Let’s hear what our trainer has to say about loneliness.
👉 [Play Trainer Message]

🔸 Step 2: Trainer Video Segment
(Embed or autoplay trainer video)
🎥 (Embed video link or LMS video element)
Alt Text: Trainer shares insights on managing loneliness and staying connected onboard.
After the video:
Chatbot:
That was powerful. Would you like to hear a message from our CEO about this?
👉 [Yes, CEO Message] | [Not now]

🔸 Step 3: CEO Message Segment
Chatbot:
💼 Here’s a message from our CEO—a voice of support from the top.
Let’s take a moment to hear their thoughts.
🎥 CEO Speech – [ADD VIDEO LINK]
(Or embed directly in LMS/chatbot platform)

🔸 Step 4: Reflection Option
Chatbot:
What stood out to you most from the videos?
👉 [I felt understood] | [I liked the advice] | [It made me reflect]
Would you like to write down your thoughts or feelings?
👉 [Yes, journal entry] | [Skip]
            `,
          },
        ],
      },
      {
        id: 2,
        title: "Chapter 2 - Participant Reflections",
        materials: [
          {
            material_name: "Participant Reflections",
            material: `
Some of the expected Answers from participants side:
1. "Yes, especially during long voyages when days feel like they’re all the same."
2. "Sometimes. Even with people around, it can feel really quiet inside."
3. "Not always, but there are moments when the silence hits harder than the waves."
4. "Yeah, especially when I miss home and can’t talk to my family."
5. "I’ve felt it during night watches—just me, the sea, and my thoughts."
6. "It’s part of the job sometimes, but it still catches me off guard."
7. "I try to stay busy, but yes—there are lonely moments for sure."

🟢 Step 1: Ask the Question
Chatbot:
Have you experienced this kind of loneliness before?
👉 [Yes] | [Sometimes] | [Not Really]

🟢 Step 2: Participant Reflection (Simulated Free Responses)
If user selects Yes or Sometimes, show expected relatable answers:
Chatbot:
Thanks for sharing. You’re not alone in this. Here’s what others at sea have said:
🗨
1. "Yes, especially during long voyages when days feel like they’re all the same."
2. "Even with people around, it can feel really quiet inside."
3. "It’s part of the job, but the silence sometimes hits harder than the waves."
4. "I miss home most when I can’t speak to my family."

Chatbot:
Do any of these sound like your experience?
👉 [Yes, very much] | [Somewhat] | [No, mine is different]
            `,
          },
        ],
      },
    ],
  };

  const [selectedChapterId, setSelectedChapterId] = useState(Content.chapters[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState(Content.chapters[0].materials[0].material);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [unlockedChapters, setUnlockedChapters] = useState([0]); // index-based unlock
  const [scrollCompleted, setScrollCompleted] = useState(false);

  const chapterIndex = Content.chapters.findIndex((ch) => ch.id === selectedChapterId);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setScrollCompleted(true);
    }
  };

  const unlockNextChapter = () => {
    const newCompleted = [...completedChapters, selectedChapterId];
    setCompletedChapters(newCompleted);

    const nextIndex = chapterIndex + 1;
    if (nextIndex < Content.chapters.length && !unlockedChapters.includes(nextIndex)) {
      setUnlockedChapters([...unlockedChapters, nextIndex]);
    }

    if (nextIndex < Content.chapters.length) {
      setSelectedChapterId(Content.chapters[nextIndex].id);
      setSelectedMaterial(Content.chapters[nextIndex].materials[0].material);
      setScrollCompleted(false);
    }
  };

  const completeLastChapter = () => {
    if (!completedChapters.includes(selectedChapterId)) {
      const newCompleted = [...completedChapters, selectedChapterId];
      setCompletedChapters(newCompleted);
    }
  };

  // ✅ Progress calculation (capped at 100%)
  const progressPercent = Math.min(
    100,
    Math.round((completedChapters.length / Content.chapters.length) * 100)
  );

  const allChaptersCompleted = completedChapters.length === Content.chapters.length;

  return (
    <div className="flex min-h-screen bg-gray-100 ml-48">
      {/* Sidebar */}
      <aside className="w-96 p-4 bg-white border-r border-gray-300 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BookOpenText className="mr-2 text-blue-400" /> Course Content
        </h2>
        {Content.chapters.map((chapter, index) => {
          const isUnlocked = unlockedChapters.includes(index);
          return (
            <div
              key={chapter.id}
              className={`mb-2 border rounded-lg ${
                !isUnlocked ? "opacity-50 pointer-events-none" : "hover:border-blue-400"
              }`}
            >
              <div
                className="px-4 py-2 cursor-pointer flex items-center"
                onClick={() => isUnlocked && setSelectedChapterId(chapter.id)}
              >
                {isUnlocked ? (
                  <Unlock className="text-blue-400 mr-2" />
                ) : (
                  <Lock className="text-gray-400 mr-2" />
                )}
                {chapter.title}
              </div>
            </div>
          );
        })}

        {/* Progress */}
        <div className="mt-6">
          <div className="text-sm text-gray-600 mb-1 flex items-center">Progress</div>
          <div className="relative h-4 bg-gray-300 rounded overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">{progressPercent}% Completed</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div
          className="bg-white p-6 rounded shadow h-[80vh] overflow-y-auto whitespace-pre-line"
          onScroll={handleScroll}
        >
          <h2 className="text-xl font-bold mb-4">{Content.chapters[chapterIndex].title}</h2>
          <p className="text-gray-800">{selectedMaterial}</p>
        </div>

        {scrollCompleted && (
          <div className="mt-4 flex justify-end space-x-4">
            {/* Show Unlock Next Chapter for all except last chapter */}
            {chapterIndex < Content.chapters.length - 1 ? (
              <button
                className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
                onClick={unlockNextChapter}
              >
                Unlock Next Chapter
              </button>
            ) : (
              <>
                {/* Last chapter -> Complete Chapter */}
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
                  onClick={completeLastChapter}
                >
                  Complete Chapter
                </button>

                {/* Show Certificate Button only when all chapters are completed */}
                {allChaptersCompleted && (
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => alert("🎉 Congratulations! Here is your certificate.")}
                  >
                    Get Certificate
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
