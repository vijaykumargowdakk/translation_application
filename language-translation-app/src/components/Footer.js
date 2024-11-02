import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Created by Vijay Kumar Gowda K K</p>
      <div className="icon-container">
        <a href="https://github.com/vijaykumargowdakk" className="footer-link" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="mailto:rvit21bis065.rvitm@rvei.edu.in" className="footer-link" aria-label="Email">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
