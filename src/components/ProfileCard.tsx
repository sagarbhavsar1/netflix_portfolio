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
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const outputGain = ctx.createGain();
  outputGain.gain.setValueAtTime(0.82, now);
  outputGain.connect(ctx.destination);

  const mainOsc = ctx.createOscillator();
  const mainFilter = ctx.createBiquadFilter();
  const mainGain = ctx.createGain();

  mainOsc.type = 'sine';
  mainOsc.frequency.setValueAtTime(540, now);
  mainOsc.frequency.exponentialRampToValueAtTime(720, now + 0.05);

  mainFilter.type = 'lowpass';
  mainFilter.frequency.setValueAtTime(2400, now);
  mainFilter.Q.setValueAtTime(0.7, now);

  mainGain.gain.setValueAtTime(0.0001, now);
  mainGain.gain.exponentialRampToValueAtTime(0.075, now + 0.004);
  mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  const harmonyOsc = ctx.createOscillator();
  const harmonyGain = ctx.createGain();

  harmonyOsc.type = 'triangle';
  harmonyOsc.frequency.setValueAtTime(810, now);
  harmonyOsc.frequency.exponentialRampToValueAtTime(1040, now + 0.05);

  harmonyGain.gain.setValueAtTime(0.0001, now);
  harmonyGain.gain.exponentialRampToValueAtTime(0.03, now + 0.004);
  harmonyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

  const transientOsc = ctx.createOscillator();
  const transientFilter = ctx.createBiquadFilter();
  const transientGain = ctx.createGain();

  transientOsc.type = 'square';
  transientOsc.frequency.setValueAtTime(1800, now);
  transientOsc.frequency.exponentialRampToValueAtTime(1300, now + 0.018);

  transientFilter.type = 'bandpass';
  transientFilter.frequency.setValueAtTime(1650, now);
  transientFilter.Q.setValueAtTime(1.1, now);

  transientGain.gain.setValueAtTime(0.0001, now);
  transientGain.gain.exponentialRampToValueAtTime(0.013, now + 0.0015);
  transientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

  mainOsc.connect(mainFilter);
  mainFilter.connect(mainGain);
  mainGain.connect(outputGain);

  harmonyOsc.connect(harmonyGain);
  harmonyGain.connect(outputGain);

  transientOsc.connect(transientFilter);
  transientFilter.connect(transientGain);
  transientGain.connect(outputGain);

  mainOsc.start(now);
  harmonyOsc.start(now);
  transientOsc.start(now);
  mainOsc.stop(now + 0.095);
  harmonyOsc.stop(now + 0.08);
  transientOsc.stop(now + 0.024);
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
