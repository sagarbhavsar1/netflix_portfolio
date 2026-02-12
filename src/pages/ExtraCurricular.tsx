import React, { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaCameraRetro, FaChalkboardTeacher, FaChevronLeft, FaChevronRight, FaTrophy, FaUsers } from 'react-icons/fa';
import './ExtraCurricular.css';

type ExtraCurricularItem = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  points: string[];
  backdrop: string;
  mobileBackdrop?: string;
  accent: string;
  icon: JSX.Element;
};

const extraCurricularItems: ExtraCurricularItem[] = [
  {
    id: 'table-tennis',
    kicker: 'National Level',
    title: 'National Level Table Tennis Player',
    summary: 'Achieved 100+ awards to date, demonstrating high discipline and teamwork skills.',
    points: [
      '100+ awards and recognitions',
      'High discipline under pressure',
      'Strong competitive mindset with teamwork',
    ],
    backdrop: '/images/extra-table-tennis-final.png',
    mobileBackdrop: '/images/extra-table-tennis-mobile.jpeg',
    accent: '#ffc56f',
    icon: <FaTrophy />,
  },
  {
    id: 'teaching',
    kicker: 'NYU Stern',
    title: 'Course Supervisor & Teaching Fellow',
    summary: "For the courses 'Databases for Business Analytics', 'Business Communication' and 'ML for managers' teaching the MBA and Executive-MBA cohort at NYU.",
    points: [
      'Databases for Business Analytics',
      'Business Communication',
      'ML for managers',
      'Teaching MBA and Executive-MBA cohorts',
    ],
    backdrop: '/images/extra-ta-roles.jpg',
    accent: '#ff5a63',
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 'srm-club',
    kicker: 'SRM IST',
    title: 'SRM Data Science Club - Vice President',
    summary: 'Organized seminars and hackathons consisting of 300+ students, promoting data science education and community engagement.',
    points: [
      '300+ students engaged through events',
      'Organized seminars and hackathons',
      'Built stronger data science learning community',
    ],
    backdrop: '/images/extra-dsc-vice-chair.jpeg',
    accent: '#ff8a5b',
    icon: <FaUsers />,
  },
  {
    id: 'aarush',
    kicker: 'SRM University',
    title: 'Aarush Event Organising Committee',
    summary: 'Management and Operations',
    points: [
      "Served as an Event Coordinator for Aarush at SRM University, overseeing event planning, logistics, and execution for one of the university's largest tech fests.",
      'Played a key role in project management and team leadership.',
      'Ensured smooth coordination across departments to deliver successful events.',
    ],
    backdrop: '/images/extra-aarush.webp',
    accent: '#a7d8b3',
    icon: <FaUsers />,
  },
  {
    id: 'photography',
    kicker: 'Life Outside Work',
    title: 'Outdoor Photography / Travel Vlogs',
    summary: 'In my leisure time, I like to travel to new places and capture moments by clicking photographs.',
    points: [
      'I love wildlife and nature photography too',
      "Here's a picture I took of a tiger",
      'Travel keeps my creativity and perspective fresh',
    ],
    backdrop: '/images/extra-travel-tiger.jpg',
    accent: '#89b4ff',
    icon: <FaCameraRetro />,
  },
];

const ExtraCurricular: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalSlides = extraCurricularItems.length;

  const progress = useMemo(() => ((activeIndex + 1) / totalSlides) * 100, [activeIndex, totalSlides]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, totalSlides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [totalSlides]);

  const onNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const onPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const previousIndex = (activeIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (activeIndex + 1) % totalSlides;
  const miniNavigatorIndices = [previousIndex, activeIndex, nextIndex];

  return (
    <section className="extra-curricular-page">
      <div className="extra-curricular-ambient" aria-hidden />

      <div className="extra-curricular-shell">
        <header className="extra-curricular-hero">
          <p className="extra-curricular-kicker">Beyond Academics & Projects</p>
          <h1 className="extra-curricular-title">Extra Curricular</h1>
          <p className="extra-curricular-subtitle">
            A personal highlight reel of leadership, teaching, sports, and creative exploration.
          </p>
        </header>

        <div
          className="extra-curricular-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="extra-curricular-progress" aria-hidden>
            <span style={{ width: `${progress}%` }} />
          </div>

          <div
            className="extra-curricular-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {extraCurricularItems.map((item, index) => (
              <article key={item.id} className={`extra-curricular-slide slide-${item.id}`}>
                <picture>
                  {item.mobileBackdrop && (
                    <source media="(max-width: 760px)" srcSet={item.mobileBackdrop} />
                  )}
                  <img
                    src={item.backdrop}
                    alt={item.title}
                    className="extra-curricular-slide-image"
                    loading="lazy"
                  />
                </picture>
                <div className="extra-curricular-slide-shade" />

                <div className="extra-curricular-slide-content">
                  <div className="extra-curricular-slide-meta">
                    <span>{String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
                    <span>{item.kicker}</span>
                  </div>

                  <div
                    className="extra-curricular-icon"
                    style={{ ['--extra-accent' as string]: item.accent } as React.CSSProperties}
                  >
                    {item.icon}
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="extra-curricular-mini-nav">
            <button type="button" className="mini-arrow" aria-label="Previous activity" onClick={onPrevious}>
              <FaChevronLeft />
            </button>

            <div className="mini-window">
              {miniNavigatorIndices.map((slideIndex, position) => {
                const relation = position === 0 ? 'Prev' : position === 1 ? 'Now' : 'Next';
                return (
                  <button
                    key={`${relation}-${extraCurricularItems[slideIndex].id}`}
                    type="button"
                    className={`mini-slide ${slideIndex === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(slideIndex)}
                    aria-label={`${relation}: ${extraCurricularItems[slideIndex].title}`}
                  >
                    <span className="mini-relation">{relation}</span>
                    <span className="mini-title">{extraCurricularItems[slideIndex].title}</span>
                  </button>
                );
              })}
            </div>

            <button type="button" className="mini-arrow" aria-label="Next activity" onClick={onNext}>
              <FaChevronRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExtraCurricular;
