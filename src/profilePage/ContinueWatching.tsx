import React from 'react';
import { Link } from 'react-router-dom';
import './ContinueWatching.css';

type ProfileType = 'recruiter' | 'developer' | 'friend' | 'adventure';

interface ContinueWatchingProps {
  profile: ProfileType;
}

const continueWatchingConfig = {
  recruiter: [
    { title: "Blogs", imgSrc: "/images/blogs.jpg", link: "/blogs" },
    { title: "Skills", imgSrc: "/images/skills-banner.jpeg", link: "/skills" },
    { title: "Experience", imgSrc: "/images/experience-banner.avif", link: "/work-experience" },
    { title: "Extra Curricular", imgSrc: "/images/extra-table-tennis-card.jpg", link: "/extra-curricular" },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", link: "/contact-me" }
  ],
  developer: [
    { title: "Blogs", imgSrc: "/images/blogs.jpg", link: "/blogs" },
    { title: "Certifications", imgSrc: "/images/certifications.webp", link: "/certifications" },
    { title: "Projects", imgSrc: "/images/projects.jpg", link: "/projects" },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", link: "/contact-me" }
  ],
  friend: [
    { title: "Blogs", imgSrc: "/images/blogs.jpg", link: "/blogs" },
    { title: "Recommendations", imgSrc: "/images/recommendations.jpg", link: "/recommendations" },
    { title: "Extra Curricular", imgSrc: "/images/extra-table-tennis-card.jpg", link: "/extra-curricular" },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", link: "/contact-me" }
  ],
  adventure: [
    { title: "Certifications", imgSrc: "/images/certifications.webp", link: "/certifications" },
    { title: "Blogs", imgSrc: "/images/blogs.jpg", link: "/blogs" },
    { title: "Contact Me", imgSrc: "/images/contact-me.jpg", link: "/contact-me" }
  ]
};

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ profile }) => {
  const continueWatching = continueWatchingConfig[profile];

  return (
    <div className="continue-watching-row">
      <h2 className="row-title">Continue Watching{profile !== 'friend' ? ` for ${profile.charAt(0).toUpperCase() + profile.slice(1)}` : ''}</h2>
      <div className="card-row">
        {continueWatching.map((pick, index) => (
          <Link to={pick.link} key={index} className="pick-card">
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
