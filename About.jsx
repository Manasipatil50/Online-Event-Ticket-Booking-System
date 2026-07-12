// src/pages/About.jsx
import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      
      <section className="about-hero">
        <h1>About SmartEvent</h1>
        <p>
          SmartEvent is your ultimate platform for discovering and booking
          unforgettable events with ease and convenience.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify event management and booking by providing
          a seamless digital experience for users, vendors, and organizers.
          We aim to connect people with the best events around them.
        </p>
      </section>

      <section className="about-features">
        <div className="feature-card">
          <h3>🎟 Easy Booking</h3>
          <p>Book your favorite events in just a few clicks.</p>
        </div>

        <div className="feature-card">
          <h3>📍 Discover Events</h3>
          <p>Explore trending and upcoming events near you.</p>
        </div>

        <div className="feature-card">
          <h3>🔐 Secure Platform</h3>
          <p>Safe authentication and reliable data protection.</p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Experience SmartEvent?</h2>
        <p>Join us today and make your moments unforgettable.</p>
      </section>

    </div>
  );
}

export default About; 