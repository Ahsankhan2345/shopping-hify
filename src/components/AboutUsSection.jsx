const AboutUsSection = () => {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        <div className="md:w-1/2">
          <img
            src="/about-us.png"
            alt="About Us"
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[400px]"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
            About Shopping HIFY
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Shopping HIFY, owned by Ahsan Khan, brings you the best products from
            fashion, technology, and lifestyle. We believe in top quality, fair prices,
            and an exceptional shopping experience for our valued customers.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Join thousands of happy customers who shop with us every day!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
