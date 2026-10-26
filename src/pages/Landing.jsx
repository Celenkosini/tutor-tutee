// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <main className="landing__main">
        <section className="hero">
          <div className="hero__copy">
            <h1>TutorTutee — Find the right tutor, fast</h1>
            <p className="muted">
              Search tutors by subject, price and location. Book, chat and learn
              — freemium model for learners, fair fees for tutors.
            </p>

            <div className="cta">
              <Link to="/tutors" className="btn btn--primary">
                Find a Tutor
              </Link>
              <Link to="/register" className="btn">
                Sign up
              </Link>
            </div>

            <div className="features">
              <div className="feature">
                <h3>Simple booking</h3>
                <p className="muted">
                  Request sessions and get approved by tutors.
                </p>
              </div>
              <div className="feature">
                <h3>Freemium</h3>
                <p className="muted">Free and Entry tiers for learners.</p>
              </div>
              <div className="feature">
                <h3>Secure payments</h3>
                <p className="muted">Platform fee is 5% — payouts to tutors.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
