import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon, FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';
import LogoCarousel from '../components/LogoCarousel';

// Rocket Launcher component - flies down the timeline with fire trail
const RocketLauncher: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <motion.div
      className="rocket-launcher"
      style={{ top: `${progress * 100}%` }}
      animate={{
        x: [0, -1, 1, -1, 0],
      }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {/* Rocket Body */}
      <div className="rocket-body">
        <FaRocket className="rocket-icon" />
      </div>

      {/* Multi-layer Flame Exhaust */}
      <div className="rocket-exhaust">
        {/* Inner flame - hottest (yellow/white) */}
        <motion.div
          className="flame flame-inner"
          animate={{
            scaleY: [1, 1.3, 1],
            scaleX: [1, 0.9, 1],
            opacity: [1, 0.9, 1],
          }}
          transition={{
            duration: 0.08,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        {/* Middle flame (orange) */}
        <motion.div
          className="flame flame-middle"
          animate={{
            scaleY: [1, 1.4, 1.1],
            scaleX: [1, 1.1, 0.95],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.02
          }}
        />
        {/* Outer flame (red) */}
        <motion.div
          className="flame flame-outer"
          animate={{
            scaleY: [1, 1.5, 1.2],
            scaleX: [1, 1.2, 0.9],
            opacity: [0.8, 0.9, 0.7],
          }}
          transition={{
            duration: 0.12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.04
          }}
        />
      </div>

      {/* Smoke/Spark Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="rocket-spark"
          style={{
            left: `${50 + (Math.random() - 0.5) * 30}%`,
          }}
          animate={{
            y: [-10, -40 - Math.random() * 30],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            delay: i * 0.05,
          }}
        />
      ))}

      {/* Glow effect */}
      <div className="rocket-glow" />
    </motion.div>
  );
};

// Rocket Landing Burst at end
const RocketLandingBurst: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="rocket-landing-burst"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Explosion particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="landing-particle"
          style={{
            background: ['#e50914', '#FFD700', '#FF6B35', '#fff', '#4ECDC4'][i % 5],
          }}
          animate={{
            x: [0, Math.cos((i * 22.5) * Math.PI / 180) * 80],
            y: [0, Math.sin((i * 22.5) * Math.PI / 180) * 80],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            delay: i * 0.03,
          }}
        />
      ))}
      {/* Center star */}
      <motion.div
        className="landing-star"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <StarIcon />
      </motion.div>
    </motion.div>
  );
};

const WorkExperience: React.FC = () => {
  const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rocketProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const unsubscribe = rocketProgress.on("change", (v) => {
      setCurrentProgress(v);
      if (v > 0.9) setShowLanding(true);
      else setShowLanding(false);
    });
    return () => unsubscribe();
  }, [rocketProgress]);

  useEffect(() => {
    async function fetchTimelineItem() {
      const data = await getTimeline();
      setTimeLineData(data);
    }
    fetchTimelineItem();
  }, []);

  if (!timeLineData) {
    return (
      <div className="experience-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p>Loading journey...</p>
      </div>
    );
  }

  // Separate work and education
  const workItems = timeLineData.filter(item => item.timelineType === 'work');
  const educationItems = timeLineData.filter(item => item.timelineType === 'education');

  return (
    <div className="experience-page" ref={containerRef}>
      {/* Header */}
      <motion.div
        className="experience-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="experience-title">
          <FaRocket className="title-icon" />
          My Professional Journey
        </h1>
      </motion.div>

      {/* Company Logos Carousel */}
      <LogoCarousel />

      {/* Timeline Container */}
      <div className="timeline-wrapper">
        {/* The Fire Trail - animated timeline line */}
        <div className="timeline-wire">
          <motion.div
            className="wire-progress fire-trail"
            style={{ height: `${currentProgress * 100}%` }}
          />
          <RocketLauncher progress={currentProgress} />
        </div>

        {/* Timeline Items */}
        <div className="timeline-items">
          {/* Work Experience Section */}
          <motion.div
            className="timeline-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-title">
              <WorkIcon className="section-icon" />
              Work Experience
            </h2>

            {workItems.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-card work"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="card-marker">
                  <WorkIcon />
                </div>
                <div className="card-inner">
                  {item.logo && (
                    <div className="card-logo-section">
                      <img src={item.logo} alt={item.name} className="company-logo-large" />
                    </div>
                  )}
                  <div className="card-content">
                    <div className="card-header">
                      <span className="card-date">{item.dateRange}</span>
                      {item.websiteUrl && (
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-link"
                        >
                          <FaExternalLinkAlt /> Visit
                        </a>
                      )}
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <h4 className="card-company">{item.name}</h4>
                    {item.techStack && (
                      <div className="card-tech">
                        {item.techStack.split(', ').slice(0, 5).map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    <p className="card-description">{item.summaryPoints}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education Section */}
          <motion.div
            className="timeline-section education-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="section-title education">
              <SchoolIcon className="section-icon" />
              Education
            </h2>

            {educationItems.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-card education"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="card-marker education">
                  <SchoolIcon />
                </div>
                <div className="card-content">
                  <span className="card-date">{item.dateRange}</span>
                  <h3 className="card-title">{item.name}</h3>
                  <h4 className="card-company">{item.title}</h4>
                  <p className="card-description">{item.summaryPoints}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Rocket Landing Burst at End */}
        <div className="timeline-end">
          <RocketLandingBurst show={showLanding} />
          <motion.p
            className="journey-start-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLanding ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            🚀 Journey Complete! ✨
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
