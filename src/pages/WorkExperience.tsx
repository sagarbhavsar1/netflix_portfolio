import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon, FaRocket } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';

// Firecracker spark component
const FirecrackerSpark: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <motion.div
      className="firecracker-spark"
      style={{ top: `${progress * 100}%` }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="spark-core" />
      <div className="spark-trail" />
      {/* Spark particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="spark-particle"
          animate={{
            x: [0, Math.cos((i * 60) * Math.PI / 180) * 12],
            y: [0, Math.sin((i * 60) * Math.PI / 180) * 12],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.08,
          }}
        />
      ))}
    </motion.div>
  );
};

// Firecracker burst at end
const FirecrackerBurst: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="firecracker-burst"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="burst-particle"
          style={{
            background: ['#e50914', '#FFD700', '#FF6B6B', '#4ECDC4', '#FFFFFF'][i % 5],
          }}
          animate={{
            x: [0, Math.cos((i * 30) * Math.PI / 180) * 60],
            y: [0, Math.sin((i * 30) * Math.PI / 180) * 60],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2,
            delay: i * 0.05,
          }}
        />
      ))}
      <StarIcon className="burst-star" />
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

  const sparkProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    const unsubscribe = sparkProgress.on("change", (v) => {
      setCurrentProgress(v);
      if (v > 0.9) setShowBurst(true);
    });
    return () => unsubscribe();
  }, [sparkProgress]);

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
          My Journey
        </h1>
        <p className="experience-subtitle">
          From education to professional experience — tracing the path of growth
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="timeline-wrapper">
        {/* The Wire - animated timeline line */}
        <div className="timeline-wire">
          <motion.div
            className="wire-progress"
            style={{ height: `${currentProgress * 100}%` }}
          />
          <FirecrackerSpark progress={currentProgress} />
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
                <div className="card-content">
                  <span className="card-date">{item.dateRange}</span>
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

        {/* Firecracker Burst at End */}
        <div className="timeline-end">
          <FirecrackerBurst show={showBurst} />
          <motion.p
            className="journey-start-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: showBurst ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Where it all began ✨
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
