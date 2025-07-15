const AboutUsSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        
        {/* IMAGE */}
        <div
          className="md:w-1/2 relative group"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          {/* Laptop Image - shifted down in frame */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="/about-us.png"
              alt="About Us"
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Overlay Text - site name inside image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-wide drop-shadow-lg bg-emerald-700/70 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500">
              Shopping HIFY
            </span>
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div
          className="md:w-1/2 space-y-6"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-700">
            About Shopping HIFY
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Shopping HIFY, proudly owned by{" "}
            <span className="text-emerald-600 font-semibold">Ahsan Khan</span>, offers you top-quality products from fashion, technology, and lifestyle. We believe in excellence, unbeatable prices, and delivering a world-class shopping experience.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Join thousands of happy customers who choose us for reliability and quality every single day!
          </p>
          {/* Button removed */}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
