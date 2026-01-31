import React, { useEffect, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';

import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaJava, FaLinux, FaDatabase } from 'react-icons/fa';
import {
  SiRubyonrails, SiTypescript, SiPostgresql, SiMysql, SiKubernetes, SiGooglecloud,
  SiSpringboot, SiPhp, SiNetlify, SiHeroku, SiHtml5, SiCss3, SiRabbitmq, SiPython,
  SiPytorch, SiTensorflow, SiScikitlearn, SiDjango, SiFlask, SiFastapi,
  SiApachehadoop, SiApachespark, SiSnowflake, SiTableau, SiPowerbi, SiLooker,
  SiMicrosoftazure, SiMicrosoftexcel, SiOracle, SiJira, SiNvidia, SiOpenapiinitiative,
  SiGooglebigquery, SiR, SiMatrix
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

  // Frontend (keeping for compatibility)
  FaReact: <FaReact color="#61DAFB" />,
  SiTypescript: <SiTypescript color="#3178C6" />,
  SiHtml5: <SiHtml5 color="#E34F26" />,
  SiCss3: <SiCss3 color="#1572B6" />,
  SiRabbitmq: <SiRabbitmq color="#FF6600" />,
};


const Skills: React.FC = () => {

  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data);
    }

    fetchSkills()
  }, []);

  if (skillsData.length === 0) return <div>Loading...</div>;

  const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});


  return (
    <div className="skills-container">
      {Object.keys(skillsByCategory).map((category, index) => (
        <div key={index} className="skill-category">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {skillsByCategory[category].map((skill: any, idx: number) => (
              <div key={idx} className="skill-card">
                <div className="icon">{iconMap[skill.icon] || <FaReact />}</div>
                <h3 className="skill-name">
                  {skill.name.split('').map((letter: any, i: number) => (
                    <span key={i} className="letter" style={{ animationDelay: `${i * 0.05}s` }}>
                      {letter}
                    </span>
                  ))}
                </h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
