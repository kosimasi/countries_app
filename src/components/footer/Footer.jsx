import React from 'react';
import './Footer.css'; // Import the CSS file for custom styling

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <div className="row">
          {/* Column 1: About Us */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best services and products to our customers. 
              Our mission is to make your life easier and better.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt"></i> 123 Main Street, City, Country</li>
              <li><i className="fas fa-phone"></i> +1 (123) 456-7890</li>
              <li><i className="fas fa-envelope"></i> info@example.com</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
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