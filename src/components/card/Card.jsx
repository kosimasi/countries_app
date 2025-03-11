import React from 'react';
import './card.css';

const Card = ({
  backgroundImage = "https://via.placeholder.com/300", 
  cardTitle = "Card Title", 
  mainContent = "This is a card component", 
  link = "#", 
}) => {
  return (
    <div>
      <a href={link} className="card text-center text-white bg-dark">
        <img src={backgroundImage} className="card-img" alt="Card Image" />
        <div className="card-img-overlay">
          <h4 className='card-title'>{cardTitle}</h4>
          <p className='card-content'>{mainContent}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;