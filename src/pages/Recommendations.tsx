import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Recommendations.css';
import LogoCarousel from '../components/LogoCarousel';

type RecommendationItem = {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  dateLine: string;
  body: React.ReactNode;
};

const recommendationItems: RecommendationItem[] = [
  {
    id: 'rajeswari',
    name: 'Rajeswari Devarajan',
    avatarUrl: '/images/recommendations/rajeswari.jpeg',
    role: 'Big Data | Machine Learning | Structural Health Monitoring | Researcher',
    dateLine: "March 4, 2025 · Rajeswari was Sagar's mentor",
    body: (
      <>
        <p>✨ "I am pleased to recommend Sagar, who I had the privilege of mentoring during his graduate studies. In my mentorship, he worked on a project titled <strong>"Image Dehazing Using Enhanced Feature Extraction Techniques in Deep Learning."</strong></p>
        <p>Throughout this project, Sagar demonstrated a strong grasp of computer vision, machine learning, and deep learning techniques. He was an excellent team player and contributed actively to the project's progress. His technical expertise was evident as he consistently applied advanced methods to enhance the project's quality.</p>
        <p>📄 Not only did Sagar complete the project within the specified time frame, but he also published a paper in a reputable <strong>Scopus-indexed IEEE conference</strong>."</p>
        <p>🌟 "I have no doubt that Sagar will continue to excel in his future endeavors and make significant contributions to the field. I highly recommend him for any role or opportunity he pursues."</p>
      </>
    ),
  },
  {
    id: 'ajay',
    name: 'Ajay Pant',
    avatarUrl: '/images/recommendations/ajay-pant.jpg',
    role: 'Senior Manager, Data Analytics | Esmech Equipment (SMS Group)',
    dateLine: 'February 2023 · Ajay managed Sagar directly',
    body: (
      <>
        <p>✨ "In my years of evaluating talent, few early professionals have left as lasting an impression as Sagar. He joined us with a hunger to learn and departed having fundamentally changed how we approached our data challenges."</p>
        <p> He has the right approach to problem solving, and can see the bigger picture. He is a great listener, and when he contributed, his insights carried weight.</p>
        <p>🌟 "I see tremendous potential in Sagar's trajectory. Grounded, thoughtful, and driven by genuine impact. Any organization would be fortunate to have him."</p>
      </>
    ),
  },
];

const getInitials = (name: string): string => {
  const parts = name.split(' ').filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
};

const Recommendations: React.FC = () => {
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  const handleAvatarError = (id: string) => {
    setAvatarErrors((previous) => ({ ...previous, [id]: true }));
  };

  return (
    <section className="recommendations-page">
      <div className="recommendations-ambient" aria-hidden />

      <div className="recommendations-shell">
        <motion.header
          className="recommendations-hero"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
        >
          <p className="recommendations-eyebrow">Professional Endorsements</p>
          <h1 className="recommendations-title">Recommendations</h1>
          <p className="recommendations-subtitle">
            A few words from leaders who have mentored me and managed me directly across research and industry.
          </p>
        </motion.header>

        <div className="recommendations-grid">
          {recommendationItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="recommendation-card"
              initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.4, delay: index * 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <header className="recommendation-header">
                <div className="profile-shell" aria-hidden>
                  {!avatarErrors[item.id] ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="profile-pic"
                      loading="lazy"
                      onError={() => handleAvatarError(item.id)}
                    />
                  ) : (
                    <span className="profile-fallback">{getInitials(item.name)}</span>
                  )}
                </div>

                <div className="recommendation-meta">
                  <h2>{item.name}</h2>
                  <p className="recommendation-role">{item.role}</p>
                  <p className="date">{item.dateLine}</p>
                </div>
              </header>

              <div className="recommendation-body">
                {item.body}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="recommendations-carousel">
          <LogoCarousel />
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
