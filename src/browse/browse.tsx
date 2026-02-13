import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import recruiterPfp from '../images/profile-recruiter-red.png';
import developerPfp from '../images/profile-developer-blue.png';
import friendPfp from '../images/profile-friend-yellow.png';
import adventurerPfp from '../images/profile-adventurer-grey.png';
import recruiterBg from '../images/recruiter-bg.jpg';
import recruiterBgMobile from '../images/recruiter-bg-mobile.png';
import './browse.css';

const Browse: React.FC = () => {
  const navigate = useNavigate();

  const profiles = [
    {
      id: "recruiter",
      name: "Recruiter",
      image: recruiterPfp,
      backgroundGif: recruiterBg,
      backgroundMobile: recruiterBgMobile
    },
    {
      id: "developer",
      name: "Developer",
      image: developerPfp,
      backgroundGif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNidDl5emZpejY2eGFxa2I4NW0zZGNpbWRlbnBrZ3N2dWhhbzM1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFPdmm3rdzeZ0kP3zG/giphy.gif" // Flickering neon lights
    },
    {
      id: "friend",
      name: "Friend",
      image: friendPfp,
      backgroundGif: "/images/friend-home-horses.gif"
    },
    {
      id: "adventure",
      name: "Bot",
      image: adventurerPfp,
      backgroundGif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmxib24ycWo2cjlmazh0NGV5NTZ2Mzd2YWY0M2tvam9oYXBwYW1ocCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ERKMnDK6tkzJe8YVa3/giphy-downsized-large.gif" // Dark ocean waves at night
    },
  ];

  const handleProfileClick = (profile: { id: string; name: string; image: string; backgroundGif: string; backgroundMobile?: string }) => {
    navigate(`/profile/${profile.id}`, { state: { profileImage: profile.image, backgroundGif: profile.backgroundGif, backgroundMobile: profile.backgroundMobile } });
  };

  return (
    <div className="browse-container">
      <p className='who-is-watching'>Who's Watching?</p>
      <div className="profiles">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            image={profile.image}
            onClick={() => handleProfileClick(profile)}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
