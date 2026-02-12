import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs, FaBrain } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiTensorflow, SiPandas, SiOpenai } from 'react-icons/si';
import { Project } from '../types';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";
import { BiChart, BiCodeAlt } from "react-icons/bi";

const techIcons: { [key: string]: JSX.Element } = {
  "ReactJS": <FaReact />,
  "NodeJS": <FaNodeJs />,
  "AWS": <FaAws />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "Ruby On Rails": <SiRubyonrails />,
  "Material UI": <SiMaterialdesign />,
  "HTML5": <SiHtml5 />,
  "CSS3": <SiCss3 />,
  "jQuery": <SiJquery />,
  "AWS-ECS": <SiAwsamplify />,
  'Cognito': <FaAws />,
  'Lambda': <FaAws />,
  'ECS': <FaAws />,
  'Jenkins': <FaJenkins />,
  'Docker': <FaDocker />,
  'GraphQL': <FaDatabase />,
  'CI/CD': <FaGitlab />,
  'GitLab': <FaGitlab />,
  'GitHub': <FaGithub />,
  'Heroku': <GrDeploy />,
  'Netlify': <GrDeploy />,
  'Firebase': <SiFirebase />,
  'GCP': <FaGoogle />,
  'Azure': <FaMicrosoft />,
  'Kubernetes': <GrKubernetes />,
  'Terraform': <SiTerraform />,
  'ArgoCD': <SiArgo />,
  'Java': <FaJava />,
  'Spring Boot': <FaJava />,
  'Python': <FaPython />,
  'Node.js': <FaNodeJs />,
  'Express.js': <FaNodeJs />,
  'Hibernate': <FaJava />,
  'Maven': <FaJava />,
  'Gradle': <FaJava />,
  'JUnit': <FaJava />,
  'Mockito': <FaJava />,
  'Jest': <FaReact />,
  'React': <FaReact />,
  'Angular': <FaAngular />,
  'Vue.js': <FaVuejs />,
  'Next.js': <FaReact />,
  'Gatsby': <FaReact />,
  'Nuxt.js': <FaVuejs />,
  'Redux': <FaReact />,
  'Vuex': <FaVuejs />,
  'Tailwind CSS': <SiCss3 />,
  'Bootstrap': <SiCss3 />,
  'JQuery': <SiJquery />,
  'TensorFlow': <SiTensorflow />,
  'Deep Learning': <FaBrain />,
  'Computer Vision': <FaBrain />,
  'LLMs': <SiOpenai />,
  'NLP': <FaBrain />,
  'Text-to-Speech': <FaBrain />,
  'Full-Stack': <BiCodeAlt />,
  'JavaScript': <BiCodeAlt />,
  'LangChain': <SiOpenai />,
  'LLMOps': <SiOpenai />,
  'CNN': <FaBrain />,
  'Django': <FaPython />,
  'ChromaDB': <FaDatabase />,
  'Pandas': <SiPandas />,
  'Data Visualization': <BiChart />,
  'Data Analysis': <BiChart />,
  'Marketing Analytics': <BiChart />,
  'Brand Strategy': <BiChart />,
  'Case Study Research': <BiChart />,
  'Research': <FaBrain />,
  'Tkinter': <FaPython />,
  'SQLite3': <FaDatabase />,
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const githubProfileUrl = 'https://github.com/sagarbhavsar1';
  const primaryStack = [
    'Python',
    'MySQL',
    'Apache Spark',
    'Java',
    'R',
    'HTML',
    'CSS',
    'JavaScript',
    'Snowflake',
    'Google Cloud',
    'Hugging Face',
    'AWS',
    'Azure',
    'Palantir',
    'Docker',
    'BigQuery',
    'Power BI',
    'LangChain',
    'LLMs',
    'AI-native IDEs',
    'AI Models',
    'API Inference Models',
    'Architecture',
  ];

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    }
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="projects-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {/* Page Header */}
      <motion.header
        className="projects-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">Practical AI and data projects, built and launched quickly.</p>
      </motion.header>

      <motion.section
        className="projects-overview"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        <div className="projects-overview-copy">
          <span className="projects-overview-kicker">Build. Experiment. Ship.</span>
          <h2 className="projects-overview-title">I iterate quickly on AI products and data-intensive systems.</h2>
          <p className="projects-overview-text">
            I turn ideas into production-ready projects with a strong focus on LLM applications, analytics workflows,
            and full-stack execution. I constantly test new models, improve performance with rapid experiments, and
            ship usable outcomes fast.
          </p>
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-github-cta"
          >
            <FaGithub />
            <span className="projects-github-label">See all up-to-date repos on GitHub</span>
            <span className="projects-github-arrow">↗</span>
          </a>
        </div>

        <div className="projects-overview-meta">
          <div className="projects-stats-grid">
            <div className="projects-stat-card">
              <span className="projects-stat-value">10+</span>
              <span className="projects-stat-label">Projects Shipped</span>
            </div>
            <div className="projects-stat-card">
              <span className="projects-stat-value">AI + Data</span>
              <span className="projects-stat-label">Core Focus</span>
            </div>
            <div className="projects-stat-card">
              <span className="projects-stat-value">Rapid, thoughtful, precise</span>
              <span className="projects-stat-label">Iteration Style</span>
            </div>
          </div>

          <div className="projects-tech-summary">
            <p className="projects-tech-heading">Primary Stack</p>
            <div className="projects-tech-pills">
              {primaryStack.map((tech, index) => (
                <span key={`${tech}-${index}`} className="projects-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            href={project.link || '#'}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            {/* Image Wrapper */}
            <div className="project-image-wrapper">
              <img
                src={project.image.url}
                alt={project.title}
                className="project-image"
              />
            </div>

            {/* Project Details */}
            <div className="project-details">
              {project.dateRange && (
                <span className="project-date">{project.dateRange}</span>
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {/* Tech Badges */}
              <div className="tech-used">
                {project.techUsed.split(', ').slice(0, 5).map((tech, i) => (
                  <span key={i} className="tech-badge">
                    {techIcons[tech.trim()] || <BiCodeAlt />} {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
