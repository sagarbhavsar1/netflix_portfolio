import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import sagarPic from '../images/sagar.jpg';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';
import { getContactMe } from '../queries/getContactMe';

const ContactMe: React.FC = () => {
  const [userData, setUserData] = useState<IContactMe>();
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
    <div className="contact-container">
      <div className="contact-header">
        <h1>Let's Connect</h1>
        <p>I'm always excited to discuss new opportunities, ideas, or just have a chat!</p>
      </div>

      <div className="contact-grid">
        {/* Left Side - Profile & Socials */}
        <div className="contact-left">
          <div className="profile-section">
            <div className="profile-image-wrapper">
              <img src={sagarPic} alt="Sagar Bhavsar" className="profile-image" />
            </div>
            <h2 className="profile-name">{userData.name}</h2>
            <p className="profile-title">{userData.title}</p>
          </div>

          {/* Social Links */}
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
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-right">
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Fill out the form below and I'll get back to you soon.</p>
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
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
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
                placeholder="Let's connect!"
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
                placeholder="Hi Sagar, I wanted to reach out about..."
                rows={6}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
