import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';
import { getSkills } from '../queries/getSkills';
import { FaSearch, FaTimes } from 'react-icons/fa';

import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaJava, FaLinux, FaDatabase, FaChartLine, FaFlask, FaCubes, FaCogs, FaRocket, FaCalendarAlt, FaComments, FaEye, FaLightbulb } from 'react-icons/fa';
import {
  SiRubyonrails, SiTypescript, SiPostgresql, SiMysql, SiKubernetes, SiGooglecloud,
  SiSpringboot, SiPhp, SiNetlify, SiHeroku, SiHtml5, SiCss3, SiRabbitmq, SiPython,
  SiPytorch, SiTensorflow, SiScikitlearn, SiDjango, SiFlask, SiFastapi,
  SiApachehadoop, SiApachespark, SiSnowflake, SiTableau, SiPowerbi, SiLooker,
  SiMicrosoftazure, SiMicrosoftexcel, SiOracle, SiJira, SiNvidia, SiOpenapiinitiative,
  SiGooglebigquery, SiR, SiMatrix, SiPalantir
} from 'react-icons/si';
import { Skill } from '../types';

const iconMap: { [key: string]: JSX.Element } = {
  // Programming & Dev
  SiPython: <SiPython color="#3776AB" />,
  FaJava: <FaJava color="#ED8B00" />,
  FaNodeJs: <FaNodeJs color="#339933" />,
  SiR: <SiR color="#276DC3" />,
  SiMatrix: <SiMatrix color="#0DBD8B" />,

  // ML & AI
  SiScikitlearn: <SiScikitlearn color="#F7931E" />,
  SiPytorch: <SiPytorch color="#EE4C2C" />,
  SiTensorflow: <SiTensorflow color="#FF6F00" />,
  SiNvidia: <SiNvidia color="#76B900" />,

  // Frameworks & APIs
  SiDjango: <SiDjango color="#092E20" />,
  SiFlask: <SiFlask color="#FFFFFF" />,
  SiFastapi: <SiFastapi color="#009688" />,
  SiOpenapiinitiative: <SiOpenapiinitiative color="#6BA539" />,
  SiRubyonrails: <SiRubyonrails color="#CC0000" />,
  SiSpringboot: <SiSpringboot color="#6DB33F" />,
  SiPhp: <SiPhp color="#777BB4" />,

  // Cloud & DevOps
  SiGooglecloud: <SiGooglecloud color="#4285F4" />,
  FaAws: <FaAws color="#FF9900" />,
  SiMicrosoftazure: <SiMicrosoftazure color="#0078D4" />,
  FaDocker: <FaDocker color="#2496ED" />,
  SiKubernetes: <SiKubernetes color="#326CE5" />,
  FaGitAlt: <FaGitAlt color="#F05032" />,
  FaLinux: <FaLinux color="#FCC624" />,
  SiHeroku: <SiHeroku color="#430098" />,
  SiNetlify: <SiNetlify color="#00C7B7" />,

  // Big Data & Analytics
  SiApachehadoop: <SiApachehadoop color="#66CCFF" />,
  SiApachespark: <SiApachespark color="#E25A1C" />,
  SiGooglebigquery: <SiGooglebigquery color="#669DF6" />,
  SiSnowflake: <SiSnowflake color="#29B5E8" />,

  // Databases
  SiMysql: <SiMysql color="#4479A1" />,
  SiPostgresql: <SiPostgresql color="#4169E1" />,
  SiOracle: <SiOracle color="#F80000" />,

  // Visualization & BI
  SiTableau: <SiTableau color="#E97627" />,
  SiPowerbi: <SiPowerbi color="#F2C811" />,
  SiLooker: <SiLooker color="#4285F4" />,
  SiMicrosoftexcel: <SiMicrosoftexcel color="#217346" />,

  // Tools
  SiJira: <SiJira color="#0052CC" />,
  SiRobotframework: <FaDatabase color="#00B7C3" />,

  // Frontend
  FaReact: <FaReact color="#61DAFB" />,
  SiTypescript: <SiTypescript color="#3178C6" />,
  SiHtml5: <SiHtml5 color="#E34F26" />,
  SiCss3: <SiCss3 color="#1572B6" />,
  SiRabbitmq: <SiRabbitmq color="#FF6600" />,

  // Big Data - Palantir
  SiPalantir: <SiPalantir color="#101113" />,

  // Concepts & Methodologies
  FaChartLine: <FaChartLine color="#4CAF50" />,
  FaFlask: <FaFlask color="#9C27B0" />,
  FaDatabase: <FaDatabase color="#FF5722" />,
  FaCubes: <FaCubes color="#2196F3" />,
  FaCogs: <FaCogs color="#607D8B" />,
  FaRocket: <FaRocket color="#e50914" />,
  FaCalendarAlt: <FaCalendarAlt color="#FF9800" />,
  FaComments: <FaComments color="#00BCD4" />,
  FaEye: <FaEye color="#673AB7" />,
  FaLightbulb: <FaLightbulb color="#FFC107" />,
};

// Skill proficiency levels (simulated - can be tied to data)
const getProficiency = (skillName: string): number => {
  const levels: { [key: string]: number } = {
    'Python': 95, 'SQL': 90, 'Machine Learning': 88, 'Deep Learning': 85,
    'AWS': 85, 'GCP': 80, 'Docker': 82, 'Kubernetes': 75,
    'Tableau': 90, 'Power BI': 85, 'Spark': 80, 'Hadoop': 75,
  };
  return levels[skillName] || Math.floor(Math.random() * 20) + 75;
};

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data);
    }
    fetchSkills();
  }, []);

  const skillsByCategory = useMemo(() => {
    return skillsData.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skillsData]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return Object.keys(skillsByCategory);

    return Object.keys(skillsByCategory).filter(category => {
      const categorySkills = skillsByCategory[category];
      return categorySkills.some((skill: any) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [skillsByCategory, searchTerm]);

  const getFilteredSkills = (category: string) => {
    if (!searchTerm) return skillsByCategory[category];
    return skillsByCategory[category].filter((skill: any) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  if (skillsData.length === 0) {
    return (
      <div className="skills-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
        />
        <p>Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="skills-page">
      {/* Hero Header */}
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="skills-title">Technical Arsenal</h1>
        <p className="skills-subtitle">
          {skillsData.length}+ technologies mastered across data science, cloud, and development
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="search-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <motion.button
            className="clear-search"
            onClick={() => setSearchTerm('')}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes />
          </motion.button>
        )}
      </motion.div>

      {/* Category Pills */}
      <motion.div
        className="category-pills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`pill ${activeCategory === null ? 'active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {Object.keys(skillsByCategory).map((category) => (
          <button
            key={category}
            className={`pill ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredCategories
            .filter(cat => activeCategory === null || cat === activeCategory)
            .map((category, index) => (
              <motion.div
                key={category}
                className="skill-category"
                variants={categoryVariants}
                layout
              >
                <h3 className="category-title">
                  <span className="category-text">{category}</span>
                  <span className="category-count">{getFilteredSkills(category).length}</span>
                </h3>

                <motion.div className="skills-grid" layout>
                  {getFilteredSkills(category).map((skill: any, idx: number) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      layout
                    >
                      <div className="card-glow" />
                      <div className="skill-icon">
                        {iconMap[skill.icon] || <FaReact />}
                      </div>
                      <h4 className="skill-name">{skill.name}</h4>
                      <p className="skill-description">{skill.description}</p>

                      {/* Proficiency Bar */}
                      <div className="proficiency-container">
                        <motion.div
                          className="proficiency-bar"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getProficiency(skill.name)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.05 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Skills;
