const MissionSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <video
        src="/mission-video.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 gap-8">
        {/* Mission Image */}
        <div
          className="w-full md:w-1/2 max-w-md transform hover:scale-105 transition duration-500 ease-in-out"
        >
          <img
            src="/mission-bg.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-2xl object-cover w-full h-auto"
          />
        </div>

        {/* Mission Text */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left space-y-6 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 drop-shadow-lg">
            Our Mission
          </h2>
          <ul className="space-y-4 text-lg sm:text-xl">
            <li className="flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              🚀
              <span>Deliver top-quality products worldwide</span>
            </li>
            <li className="flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              ⚡
              <span>Ensure fast and reliable shopping experience</span>
            </li>
            <li className="flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
              💰
              <span>Offer unbeatable prices and deals</span>
            </li>
          </ul>
          <p className="text-emerald-200 font-medium mt-4">
            At Shopping HIFY, we strive for excellence and innovation
            in every product and service we offer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
