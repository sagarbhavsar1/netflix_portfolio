import React from 'react';
import './Blogs.css';
import { FaLinkedin } from 'react-icons/fa';

const linkedInEmbeds = [
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7418749151594647553?collapsed=1",
    height: 602
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7414125062611587072?collapsed=1",
    height: 601
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7411235324883779584?collapsed=1",
    height: 602
  },
  {
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7323042063657189376?collapsed=1",
    height: 264
  }
];

const additionalLinks = [
  {
    title: "AI & Machine Learning Insights",
    platform: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/posts/sagarbhavsar1_ai-artificialintelligence-machinelearning-activity-7316926902655447040-UXCC",
    description: "My thoughts on AI, Artificial Intelligence, and Machine Learning trends."
  }
];

const Blogs: React.FC = () => {
  return (
    <div className="blogs-container">
      <h2 className="blogs-title">✍️ My Articles & Posts</h2>
      <p className="blogs-intro">Thoughts, insights, and learnings from my journey in AI, Data Science, and Technology.</p>

      {/* LinkedIn Embeds */}
      <div className="linkedin-embeds-grid">
        {linkedInEmbeds.map((embed, index) => (
          <div key={index} className="linkedin-embed-wrapper">
            <iframe
              src={embed.embedUrl}
              height={embed.height}
              width="100%"
              frameBorder="0"
              allowFullScreen
              title={`LinkedIn Post ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Additional Links */}
      <div className="blogs-grid">
        {additionalLinks.map((blog, index) => (
          <a href={blog.link} key={index} target="_blank" rel="noopener noreferrer" className="blog-card" style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}>
            <div className="blog-icon animated-icon">{blog.icon}</div>
            <div className="blog-info animated-text">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
              <span className="blog-platform">{blog.platform}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
