import React from 'react';

function OurMission() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <header className="bg-green-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">🌍 Our Mission: A Greener Tomorrow</h1>
        <p className="text-lg max-w-2xl mx-auto">Together, we tackle e-waste challenges in India and around the world.</p>
      </header>

      <section className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">What Are We Doing?</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src="https://img.freepik.com/free-vector/e-waste-concept-illustration_114360-17082.jpg" alt="What we do" className="rounded-lg shadow-md" />
          <div>
            <p className="text-lg">
              We’re building a modern, accessible e-waste collection system to help individuals, businesses, and communities
              responsibly dispose of electronic waste. By enabling easy pickups, smart tracking, and real-time insights, we aim
              to reduce environmental hazards and promote recycling.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Why Are We Doing This?</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg mb-4">
              India generates over <strong>3.2 million metric tons</strong> of e-waste every year, but only a fraction is recycled properly.
              Most of it ends up in landfills or is handled unsafely, causing serious health and environmental problems.
            </p>
            <p className="text-lg">
              Globally, e-waste is the fastest growing waste stream. Our mission is to empower users with knowledge, tools, and
              access to dispose of their e-waste safely, responsibly, and sustainably.
            </p>
          </div>
          <img src="https://cdn.pixabay.com/photo/2021/09/21/07/58/electronic-waste-6643037_1280.jpg" alt="Why we do it" className="rounded-lg shadow-md" />
        </div>
      </section>

      <section className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">When Did We Start?</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src="https://cdn.pixabay.com/photo/2016/08/03/08/45/earth-1566413_1280.jpg" alt="Our timeline" className="rounded-lg shadow-md" />
          <div>
            <p className="text-lg mb-4">
              Our journey began in <strong>2025</strong>, inspired by the urgent need to tackle the e-waste crisis both in India and globally.
              We’re a growing community of tech enthusiasts, environmentalists, and changemakers who believe in action over excuses.
            </p>
            <p className="text-lg">
              With each pickup, each recycling act, and each informed user, we’re moving closer to our goal of a cleaner, greener planet.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-12 px-6 md:px-20 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-4">🌱 Want to Join the Movement?</h3>
        <p className="text-lg mb-4">Start by scheduling a pickup, sharing our mission, or learning how to recycle smarter.</p>
        <a href="/Register" className="inline-block bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition">
          Schedule a Pickup Now
        </a>
      </section>

      <footer className="bg-green-800 text-white py-6 text-center">
        <p>&copy; 2025 E-Waste Manager. Building a sustainable future, one device at a time.</p>
      </footer>
    </div>
  );
}

export default OurMission;
