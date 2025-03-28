import React from "react";
import Footer from "../../components/footer/Footer";
import "./homePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <nav className="hero-navbar">
          <div className="nav-container">
            <div className="nav-content">
              <ul className="nav-links">
                <li>
                  <a className="nav-brand" href="#">
                    Countries Explorer
                  </a>
                </li>
                <li>
                  <a href="/" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/pract" className="nav-link">
                    Practice
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="display-4 mb-3">Discover Our World</h1>
            <p className="lead mb-4">
              Explore comprehensive information about every country on Earth
            </p>
            <a href="countries" className="cta-button">
              Start Exploring
            </a>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-cards text-light">
            <div className="info-card">
              <div className="card-icon">🌍</div>
              <h3>Comprehensive Data</h3>
              <p>
                Access detailed information about countries including
                population, capital cities, languages, and more.
              </p>
            </div>
            <div className="info-card">
              <div className="card-icon">⚡</div>
              <h3>Fast API Integration</h3>
              <p>
                Powered by the reliable REST Countries API delivering up-to-date
                information.
              </p>
            </div>
            <div className="info-card">
              <div className="card-icon">🔍</div>
              <h3>Easy Exploration</h3>
              <p>
                Intuitive interface designed to make country discovery simple
                and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Explore?</h2>
          <p>Start your journey through the world's countries now</p>
          <a href="/countries" className="cta-button">
            Browse All Countries
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
