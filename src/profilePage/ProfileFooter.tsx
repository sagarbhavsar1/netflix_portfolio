import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaMedium, FaHackerrank, FaEnvelope } from 'react-icons/fa';
import './ProfileFooter.css';

const ProfileFooter: React.FC = () => {
  return (
    <footer className="profile-footer" aria-label="Profile footer links">
      <div className="profile-footer-inner">
        <div className="profile-footer-social">
          <a href="https://www.linkedin.com/in/sagarbhavsar1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/sagarbhavsar1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://medium.com/@sagarbhavsar2001" target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <FaMedium />
          </a>
          <a href="https://www.hackerrank.com/sagarbhavsar2001" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
            <FaHackerrank />
          </a>
          <a href="mailto:sb9568@nyu.edu" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        <div className="profile-footer-links">
          <div className="footer-link-column">
            <Link to="/work-experience">Experience</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/certifications">Certifications</Link>
          </div>

          <div className="footer-link-column">
            <Link to="/recommendations">Recommendations</Link>
            <Link to="/extra-curricular">Extra Curricular</Link>
            <Link to="/find-your-fit">Find Your Fit</Link>
            <Link to="/blogs">Blogs</Link>
          </div>

          <div className="footer-link-column">
            <Link to="/contact-me">Work With Me</Link>
            <a
              href="https://drive.google.com/file/d/1Pc92UQm9EPoMALGGO5WMfhrAOPPvEVq3/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a href="https://www.linkedin.com/in/sagarbhavsar1/" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
            <a href="https://github.com/sagarbhavsar1" target="_blank" rel="noopener noreferrer">
              GitHub Repositories
            </a>
          </div>
        </div>

        <div className="profile-footer-meta">
          <p>© 2026 Sagar Bhavsar</p>
        </div>
      </div>
    </footer>
  );
};

export default ProfileFooter;
