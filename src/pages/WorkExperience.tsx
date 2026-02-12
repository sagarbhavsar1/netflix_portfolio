import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';
import LogoCarousel from '../components/LogoCarousel';

const WorkExperience: React.FC = () => {
  const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEndStarActive, setIsEndStarActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rawLineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const smoothLineProgress = useSpring(rawLineProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.5,
  });
  const lineProgress = useTransform(smoothLineProgress, (value) => Math.min(1, Math.max(0, value)));

  useMotionValueEvent(lineProgress, "change", (value) => {
    const reachedEnd = value >= 0.995;
    setIsEndStarActive((prev) => (prev === reachedEnd ? prev : reachedEnd));
  });

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
            style={{ scaleY: lineProgress }}
          />
          <motion.div
            className={`timeline-end-star ${isEndStarActive ? 'active' : ''}`}
            animate={isEndStarActive
              ? { scale: [1, 1.18, 1], opacity: [0.88, 1, 0.88] }
              : { scale: 1, opacity: 0.72 }}
            transition={isEndStarActive
              ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }}
          >
            <img src="/images/timeline-star.svg" alt="Timeline end star" className="timeline-end-star-image" />
          </motion.div>
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
                <div className="card-inner">
                  {item.logo && (
                    <div className="card-logo-section education">
                      <img src={item.logo} alt={item.name} className="company-logo-large" />
                    </div>
                  )}
                  <div className="card-content">
                    <span className="card-date">{item.dateRange}</span>
                    <h3 className="card-title">{item.name}</h3>
                    <h4 className="card-company">{item.title}</h4>
                    <p className="card-description">{item.summaryPoints}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
