import React from 'react';
import './Recommendations.css';

const Recommendations: React.FC = () => {
  return (
    <div className='timeline-container'>
      {/* Recommendation 1 - Rajeswari Devarajan */}
      <div className="recommendation-card">
        <div className="recommendation-header">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQEj1QM5Z1rG7w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718285344207?e=1744243200&v=beta&t=placeholder"
            alt="Rajeswari Devarajan"
            className="profile-pic"
          />
          <div>
            <h3>Rajeswari Devarajan</h3>
            <p>Big Data | Machine Learning | Structural Health Monitoring | Researcher</p>
            <p className="date">March 4, 2025 · Rajeswari was Sagar's mentor</p>
          </div>
        </div>
        <div className="recommendation-body">
          <p>✨ "I am pleased to recommend Sagar, who I had the privilege of mentoring during his graduate studies. In my mentorship, he worked on a project titled <strong>"Image Dehazing Using Enhanced Feature Extraction Techniques in Deep Learning."</strong></p>
          <p>Throughout this project, Sagar demonstrated a strong grasp of computer vision, machine learning, and deep learning techniques. He was an excellent team player and contributed actively to the project's progress. His technical expertise was evident as he consistently applied advanced methods to enhance the project's quality.</p>
          <p>📄 Not only did Sagar complete the project within the specified time frame, but he also published a paper in a reputable <strong>Scopus-indexed IEEE conference</strong>."</p>
          <p>🌟 "I have no doubt that Sagar will continue to excel in his future endeavors and make significant contributions to the field. I highly recommend him for any role or opportunity he pursues."</p>
        </div>
      </div>

      {/* Recommendation 2 - Ajay Pant */}
      <div className="recommendation-card">
        <div className="recommendation-header">
          <img
            src="https://ui-avatars.com/api/?name=Ajay+Pant&background=1e3a5f&color=fff&size=100"
            alt="Ajay Pant"
            className="profile-pic"
          />
          <div>
            <h3>Ajay Pant</h3>
            <p>Senior Manager, Data Analytics | Esmech Equipment (SMS Group)</p>
            <p className="date">February 2023 · Ajay managed Sagar directly</p>
          </div>
        </div>
        <div className="recommendation-body">
          <p>✨ "In my years of evaluating talent, few early professionals have left as lasting an impression as Sagar. He joined us with a hunger to learn and departed having fundamentally changed how we approached our data challenges."</p>
          <p> He has the right approach to problem solving, and can see the bigger picture. He is a great listener, and when he contributed, his insights carried weight.</p>
          <p>🌟 "I see tremendous potential in Sagar's trajectory. Grounded, thoughtful, and driven by genuine impact. Any organization would be fortunate to have him."</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
