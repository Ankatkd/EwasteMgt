import React, { useState, useEffect } from 'react';

function Home() {
  const activities = [
    {
      image: 'https://www.teriin.org/sites/default/files/2019-11/tg-nov19-og.jpg',
      description: 'E-waste drive in Delhi – 500kg collected!',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPkhMe2H5V9mKa0gW8wNCA57g1Z1wtby2DA&s',
      description: 'Awareness camp held at XYZ School.',
    },
    {
      image: 'https://salwanpublicschool.com/wp-content/uploads/2022/08/E-Waste-Collection-drive1.jpeg',
      description: 'Partnered with Recycle India Foundation to expand collection centers.',
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activities.length]);

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + activities.length) % activities.length);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % activities.length);
  };

  return (
    <div className="space-y-12">

      {/* Hero Section */}
      <section className="bg-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Reduce. Reuse. Recycle.</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We are committed to responsible e-waste management and making our planet cleaner. Join us in our mission to give electronic waste a second life.
        </p>
      </section>

{/* Image Carousel with Info */}
<section className="bg-gray-100 py-10">
  <h3 className="text-2xl font-bold text-center text-green-900 mb-6">Recent Activities</h3>
  <div className="relative max-w-7xl mx-auto bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">

    {/* Image Container */}
    <div className="w-full md:w-2/3 h-[45vh]">
      <img
        src={activities[currentImage].image}
        alt="Recent Activity"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Info */}
    <div className="w-full md:w-1/3 p-6 flex flex-col justify-center bg-gray-50">
      <p className="text-lg text-gray-700">{activities[currentImage].description}</p>
    </div>

    {/* Buttons */}
    <button
      onClick={prevImage}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
    >
      &#8249;
    </button>
    <button
      onClick={nextImage}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
    >
      &#8250;
    </button>
  </div>
</section>


      {/* Scrollable Detailed Info */}
      <section className="bg-white py-10 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">Why E-Waste Management Matters</h3>
        <div className="h-60 overflow-y-auto space-y-4 text-gray-700">
          <p>
            E-waste contains harmful chemicals like lead, cadmium, and mercury which can seep into the environment and pose risks to human health and ecosystems.
          </p>
          <p>
            Recycling electronic waste helps recover valuable materials like gold, silver, and copper, reducing the need for mining and conserving natural resources.
          </p>
          <p>
            Proper disposal creates job opportunities, promotes sustainability, and ensures that electronic devices are handled safely.
          </p>
          <p>
            With the rise in technology consumption, the need for effective e-waste handling is more urgent than ever. Over 50 million metric tons are generated globally every year.
          </p>
        </div>
      </section>

      {/* India Stats Section */}
      <section className="bg-green-100 py-12 px-4 text-center">
        <h3 className="text-2xl font-bold text-green-900 mb-8">📍 E-Waste in India</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">3.2M</p>
            <p className="text-gray-600">Tons generated in 2023</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">Only 10%</p>
            <p className="text-gray-600">Properly collected & processed</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">Top 5</p>
            <p className="text-gray-600">India ranks among top e-waste producers</p>
          </div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="bg-green-50 py-12 px-4 text-center">
        <h3 className="text-2xl font-bold text-green-900 mb-8">🌍 Global E-Waste Trends</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">50M+</p>
            <p className="text-gray-600">Tons generated worldwide (2022)</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">20%</p>
            <p className="text-gray-600">Recycled properly worldwide</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <p className="text-3xl font-bold text-green-700">74M</p>
            <p className="text-gray-600">Tons expected by 2030</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
