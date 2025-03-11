import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Card from '../../components/card/Card';
import newsFeed from "../../assets/image.jpg";
import countries from "../../assets/countries.jpg";
import laptop from "../../assets/laptop.jpg";
import Dog from "../../assets/dog.jpg";
import Footer from '../../components/footer/Footer';
import './homePage.css';

function HomePage() {
  const cardData = [
    {
      cardTitle: "News Feed",
      mainContent: "Latest news and updates from around the world.",
      backgroundImage: newsFeed,
      link: "#",
    },
    {
      cardTitle: "Popular Topics",
      mainContent: "Discover the latest trends and discussions.",
      backgroundImage: countries,
      link: "#",
    },
    {
      cardTitle: "Events",
      mainContent: "Find out about the latest events in your area.",
      backgroundImage: laptop,
      link: "#",
    },
    {
      cardTitle: "Weather",
      mainContent: "Get the latest weather updates for your area.",
      backgroundImage: Dog,
      link: "#",
    },
  ];

  return (
    <div className="main-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section text-center text-light py-5">
        <h1 className="display-4 mb-3">Welcome to the API Explorer</h1>
        <p className="lead mb-4">
          Explore, learn, and interact with various open APIs integrated into this site.
        </p>
        <a href="#explore" className="btn btn-primary btn-lg">Start Exploring</a>
      </section>

      {/* <ContentArea /> */}
      
      <div className="container py-5">
        <h3 className="text-center text-light mb-4">Explore More</h3>
        <div className="row justify-content-center">
          {cardData.map((card, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
