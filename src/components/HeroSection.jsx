import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Video autoplay prevented:", e);
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <section className="relative w-full h-full">
        {/* Background Video with subtle zoom-in animation */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Background promotional video"
        >
          {/* Files in public/ are served from root */}
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-6">
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-white mb-4 drop-shadow-lg 
                       opacity-0 translate-y-10 animate-fadeUp"
          >
            Welcome to Shopping HIFY
          </h1>

          <p
            className="text-lg sm:text-2xl text-emerald-200 font-medium mb-6 max-w-3xl 
                       opacity-0 translate-y-10 animate-fadeUp delay-200"
          >
            Your one-stop shop for fashion, tech, and lifestyle essentials.
          </p>

          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-700 
                       hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold 
                       text-lg px-8 py-3 rounded-full shadow-lg transition duration-300 
                       hover:scale-105 hover:shadow-emerald-500/50 animate-fadeUp delay-400
                       glow-btn"
          >
            Explore Shopping Zone
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
