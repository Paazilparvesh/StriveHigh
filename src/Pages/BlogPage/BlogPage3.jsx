import vedio3 from "/src/assets/BlogVideo/vedio3.mp4";

const BlogPage = () => {
  const videos = [
    { id: 3, title: "Vedio 3", file: vedio3 },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
    Not Just Waves – Megan’s Story

      </h1>

      {/* One video per line */}
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-xl shadow-md overflow-hidden bg-white"
          >
            <h2 className="text-lg font-semibold p-3">{video.title}</h2>
            <div className="w-full aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src={video.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
