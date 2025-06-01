import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <div className="row">
          {/* Column 1: About Us */}
          <div className="col-md-4">
            <h5>About App</h5>
            <p>
            Making global exploration easy—right at your fingertips.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt"></i> Admarc Street Chilomoni,Blantyre,Malawi</li>
              <li><i className="fas fa-phone"></i>  (+265) 991-644-803</li>
              <li><i className="fas fa-envelope"></i>cosmaschilewani@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;