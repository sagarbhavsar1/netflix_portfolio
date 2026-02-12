import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProfilePage.css';

import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';
import ContinueWatching from './ContinueWatching';
type ProfileType = 'recruiter' | 'developer' | 'friend' | 'adventure';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const backgroundGif = location.state?.backgroundGif || "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif";
  const backgroundMobile = location.state?.backgroundMobile;
  const { profileName } = useParams<{ profileName: string }>();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentBackground = isMobile && backgroundMobile ? backgroundMobile : backgroundGif;

  const profile = ['recruiter', 'developer', 'friend', 'adventure'].includes(profileName!)
    ? (profileName as ProfileType)
    : 'recruiter';
  return (
    <>
      <div
        className="profile-page"
        style={{ backgroundImage: `url(${currentBackground})` }}
      >
        <ProfileBanner
        />
      </div>
      <TopPicksRow profile={profile} />
      <ContinueWatching profile={profile} />
    </>
  );
};

export default ProfilePage;
