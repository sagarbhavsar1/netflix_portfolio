import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { FaCode, FaBriefcase, FaCertificate, FaHandsHelping, FaProjectDiagram, FaEnvelope, FaRocket } from 'react-icons/fa';

type ProfileType = 'recruiter' | 'developer' | 'friend' | 'adventure';

interface TopPicksRowProps {
  profile: ProfileType;
}

const topPicksConfig = {
  recruiter: [
    { title: "Find Your Fit", imgSrc: "/images/find-your-fit.jpg", icon: <FaRocket />, route: "/find-your-fit" },
    { title: "Skills", imgSrc: "/images/skills-banner.jpeg", icon: <FaCode />, route: "/skills" },
    { title: "Experience", imgSrc: "/images/experience-banner.avif", icon: <FaBriefcase />, route: "/work-experience" },
    { title: "Certifications", imgSrc: "/images/certifications.webp", icon: <FaCertificate />, route: "/certifications" },
    { title: "Recommendations", imgSrc: "/images/recommendations.jpg", icon: <FaHandsHelping />, route: "/recommendations" },
    { title: "Projects", imgSrc: "/images/projects.jpg", icon: <FaProjectDiagram />, route: "/projects" },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", icon: <FaEnvelope />, route: "/contact-me" }
  ],
  developer: [
    { title: "Skills", imgSrc: "/images/skills-banner.jpeg", route: "/skills", icon: <FaCode /> },
    { title: "Projects", imgSrc: "/images/projects.jpg", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Certifications", imgSrc: "/images/certifications.webp", route: "/certifications", icon: <FaCertificate /> },
    { title: "Experience", imgSrc: "/images/experience-banner.avif", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Recommendations", imgSrc: "/images/recommendations.jpg", route: "/recommendations", icon: <FaHandsHelping /> },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", route: "/contact-me", icon: <FaEnvelope /> }
  ],
  friend: [
    { title: "Recommendations", imgSrc: "/images/recommendations.jpg", route: "/recommendations", icon: <FaHandsHelping /> },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", route: "/contact-me", icon: <FaEnvelope /> },
    { title: "Projects", imgSrc: "/images/projects.jpg", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Experience", imgSrc: "/images/experience-banner.avif", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Certifications", imgSrc: "/images/certifications.webp", route: "/certifications", icon: <FaCertificate /> },
  ],
  adventure: [
    { title: "Projects", imgSrc: "/images/projects.jpg", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Skills", imgSrc: "/images/skills-banner.jpeg", route: "/skills", icon: <FaCode /> },
    { title: "Experience", imgSrc: "/images/experience-banner.avif", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", route: "/contact-me", icon: <FaEnvelope /> },
    { title: "Certifications", imgSrc: "/images/certifications.webp", route: "/certifications", icon: <FaCertificate /> }
  ]
};


const TopPicksRow: React.FC<TopPicksRowProps> = ({ profile }) => {
  const navigate = useNavigate();
  const topPicks = topPicksConfig[profile];

  return (
    <div className="top-picks-row">
      <h2 className="row-title">Today's Top Picks{profile !== 'friend' ? ` for ${{ recruiter: 'Recruiter', developer: 'Developer', adventure: 'Bot' }[profile] || profile.charAt(0).toUpperCase() + profile.slice(1)}` : ''}</h2>
      <div className="card-row">
        {topPicks.map((pick, index) => (
          <div
            key={index}
            className="pick-card"
            onClick={() => navigate(pick.route)}
            style={{ animationDelay: `${index * 0.2}s` }} // Adding delay based on index
          >
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksRow;
