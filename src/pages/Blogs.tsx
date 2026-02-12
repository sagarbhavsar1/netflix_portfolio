import React from 'react';
import './Blogs.css';

const linkedInEmbeds = [
  {
    id: 'post-1',
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7418749151594647553?collapsed=1",
    height: 602
  },
  {
    id: 'post-2',
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7414125062611587072?collapsed=1",
    height: 601
  },
  {
    id: 'post-3',
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7411235324883779584?collapsed=1",
    height: 602
  },
  {
    id: 'post-4',
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7323042063657189376?collapsed=1",
    height: 264
  }
];

const Blogs: React.FC = () => {
  return (
    <section className="blogs-page">
      <div className="blogs-ambient" aria-hidden />
      <div className="blogs-shell">
        <header className="blogs-hero">
          <p className="blogs-kicker">Writing & Insights</p>
          <h1 className="blogs-title">Articles & Posts</h1>
          <p className="blogs-intro">Thoughts, insights, and learnings from my journey in AI, Data Science, and Technology.</p>
        </header>

        <section className="blogs-feed">
          <div className="linkedin-embeds-grid">
            {linkedInEmbeds.map((embed, index) => (
              <div
                key={embed.id}
                className="linkedin-embed-card"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="linkedin-embed-wrapper">
                  <iframe
                    src={embed.embedUrl}
                    height={embed.height}
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    title={`LinkedIn Post ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Blogs;
