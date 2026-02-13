import React from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

let hoverAudioContext: AudioContext | null = null;

const getHoverAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (hoverAudioContext) return hoverAudioContext;

  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  hoverAudioContext = new AudioContextClass();
  return hoverAudioContext;
};

const playHoverTick = () => {
  const ctx = getHoverAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => { });
  }

  const now = ctx.currentTime;
  const outputGain = ctx.createGain();
  outputGain.gain.setValueAtTime(0.9, now);
  outputGain.connect(ctx.destination);

  // --- Layer 1: Subtle body (minimal bass, just presence) ---
  const bodyOsc = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  const bodyFilter = ctx.createBiquadFilter();

  bodyOsc.type = 'sine';
  bodyOsc.frequency.setValueAtTime(400, now);
  bodyOsc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

  bodyFilter.type = 'lowpass';
  bodyFilter.frequency.setValueAtTime(800, now);
  bodyFilter.Q.setValueAtTime(0.5, now);

  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.05, now + 0.002);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

  bodyOsc.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(outputGain);

  // --- Layer 2: Dominant knock (the main "tock") ---
  const knockOsc = ctx.createOscillator();
  const knockGain = ctx.createGain();
  const knockFilter = ctx.createBiquadFilter();

  knockOsc.type = 'triangle';
  knockOsc.frequency.setValueAtTime(1800, now);
  knockOsc.frequency.exponentialRampToValueAtTime(800, now + 0.012);

  knockFilter.type = 'bandpass';
  knockFilter.frequency.setValueAtTime(1200, now);
  knockFilter.Q.setValueAtTime(4.0, now);

  knockGain.gain.setValueAtTime(0.0001, now);
  knockGain.gain.exponentialRampToValueAtTime(0.14, now + 0.001);
  knockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

  knockOsc.connect(knockFilter);
  knockFilter.connect(knockGain);
  knockGain.connect(outputGain);

  // --- Layer 3: Bright click (sharp edge) ---
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  const clickFilter = ctx.createBiquadFilter();

  clickOsc.type = 'square';
  clickOsc.frequency.setValueAtTime(5500, now);
  clickOsc.frequency.exponentialRampToValueAtTime(2500, now + 0.004);

  clickFilter.type = 'highpass';
  clickFilter.frequency.setValueAtTime(2200, now);
  clickFilter.Q.setValueAtTime(1.0, now);

  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.08, now + 0.0005);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

  clickOsc.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(outputGain);

  // --- Start & stop all layers ---
  bodyOsc.start(now);
  knockOsc.start(now);
  clickOsc.start(now);
  bodyOsc.stop(now + 0.03);
  knockOsc.stop(now + 0.025);
  clickOsc.stop(now + 0.008);
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, image, onClick }) => {
  return (
    <div className="profile-card" onClick={onClick} onMouseEnter={playHoverTick}>
      <div className="image-container">
        <img src={image} alt={`${name} profile`} className="profile-image" />
      </div>
      <h3 className="profile-name">{name}</h3>
    </div>
  );
};

export default ProfileCard;
