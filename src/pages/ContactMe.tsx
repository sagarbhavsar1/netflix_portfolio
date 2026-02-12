import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './ContactMe.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';
import { getContactMe } from '../queries/getContactMe';

const ContactMe: React.FC = () => {
  const [userData, setUserData] = useState<IContactMe>();
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    async function fetchUserData() {
      const data = await getContactMe();
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${userData?.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <section className="contact-page">
      <div className="contact-ambient" aria-hidden />
      <div className="contact-shell">
        <motion.header
          className="contact-hero"
          initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: 'easeOut' }}
        >
          <div className="contact-hero-copy">
            <h1 className="contact-title">Work With Me</h1>
          </div>
        </motion.header>

        <div className="contact-grid">
          <aside className="contact-panel contact-panel-left">
            <div className="identity-block">
              <div className="profile-image-wrapper">
                <img src={userData.profilePicture.url} alt={userData.name} className="contact-profile-image" />
              </div>
              <h2 className="profile-name">{userData.name}</h2>
              <p className="profile-title">{userData.title}</p>
              <p className="profile-summary">{userData.summary}</p>
            </div>

            <div className="social-links">
              <a href={userData.linkedinLink} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/sagarbhavsar1" target="_blank" rel="noopener noreferrer" className="social-btn github">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href={`mailto:${userData.email}`} className="social-btn email">
                <FaEnvelope />
                <span>Email</span>
              </a>
            </div>
          </aside>

          <section className="contact-panel contact-panel-right">
            <div className="form-header">
              <h2>Send a Message</h2>
              <p>Share context about your project, role, or collaboration idea.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration opportunity"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Sagar, I would love to discuss..."
                  rows={7}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
