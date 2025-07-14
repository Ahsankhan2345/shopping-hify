const MissionSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 px-4">
        <div className="md:w-1/2">
          <img
            src="/mission-bg.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
            Our Mission
          </h2>
          <ul className="space-y-4 text-lg text-gray-600">
            <li>🚀 Deliver top-quality products worldwide</li>
            <li>⚡ Ensure fast and reliable shopping experience</li>
            <li>💰 Offer unbeatable prices and deals</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
