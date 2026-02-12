import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt, FaGoogle, FaShieldAlt, FaUniversity } from 'react-icons/fa';
import { SiCoursera, SiIeee, SiPalantir, SiUdemy } from 'react-icons/si';
import './Certifications.css';
import { getCertifications } from '../queries/getCertifications';
import { Certification } from '../types';

const iconData: Record<string, React.ReactNode> = {
  udemy: <SiUdemy />,
  coursera: <SiCoursera />,
  ieee: <SiIeee />,
  university: <FaUniversity />,
  palantir: <SiPalantir />,
  google: <FaGoogle />,
  security: <FaShieldAlt />,
};

const badgeData: Record<string, string> = {
  udemy: 'Udemy',
  coursera: 'Workshop',
  ieee: 'IEEE',
  university: 'Academic',
  palantir: 'Platform',
  google: 'Google',
  security: 'Security',
};

const badgeOverrideByTitle: Record<string, string> = {
  'BCG Data Science Virtual Internship': 'Professional',
  'EasyTransfer Internship Certificate': 'Professional',
  'HighRadius Data Science Program': 'Professional',
  'Palantir Foundry & AIP Builder Foundations': 'Professional',
};

const logoOnlyByTitle: Record<string, string> = {
  'Palantir Foundry & AIP Builder Foundations': '/logos/certifications/palantir.png',
  'BCG Data Science Virtual Internship': '/logos/certifications/bcg.png',
  'ISRO Space Science Certificate': '/logos/certifications/isro.png',
  'EasyTransfer Internship Certificate': '/logos/certifications/easytransfer.png',
  'HighRadius Data Science Program': '/logos/certifications/highradius.jpeg',
  'C Programming Certificate': '/logos/certifications/c-logo.png',
};

const extractIssuedYear = (issuedDate: string): number => {
  const matches = issuedDate.match(/\d{4}/g);
  if (!matches) return 0;

  const years = matches.map((value) => Number(value)).filter((value) => Number.isFinite(value));
  return years.length > 0 ? Math.max(...years) : 0;
};

const getCertificationKey = (certification: Certification): string => (
  `${certification.title}|${certification.issuer}|${certification.issuedDate}|${certification.link}`
);

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const data = await getCertifications();
        setCertifications(data);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  const sortedCertifications = useMemo(() => (
    [...certifications].sort((a, b) => {
      const yearDelta = extractIssuedYear(b.issuedDate) - extractIssuedYear(a.issuedDate);
      if (yearDelta !== 0) return yearDelta;

      const dateDelta = b.issuedDate.localeCompare(a.issuedDate, undefined, { numeric: true, sensitivity: 'base' });
      if (dateDelta !== 0) return dateDelta;

      const issuerDelta = a.issuer.localeCompare(b.issuer);
      if (issuerDelta !== 0) return issuerDelta;

      return a.title.localeCompare(b.title);
    })
  ), [certifications]);

  const handleLogoError = (key: string) => {
    setFailedLogos((previous) => ({ ...previous, [key]: true }));
  };

  return (
    <section className="certifications-page">
      <div className="certifications-ambient" aria-hidden />
      <div className="certifications-shell">
        <motion.header
          className="certifications-hero"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.45, ease: 'easeOut' }}
        >
          <p className="certifications-eyebrow">Career Credentials</p>
          <h1 className="certifications-title">Certifications</h1>
          <p className="certifications-subtitle">
            Verified credentials, workshops, and publications across AI, analytics, and engineering.
          </p>
        </motion.header>

        {isLoading && (
          <div className="certifications-loading" role="status" aria-live="polite">
            <span className="certifications-spinner" aria-hidden />
            <p>Loading certifications...</p>
          </div>
        )}

        {!isLoading && sortedCertifications.length === 0 && (
          <div className="certifications-empty">No certifications to display.</div>
        )}

        {!isLoading && sortedCertifications.length > 0 && (
          <div className="certifications-grid">
            {sortedCertifications.map((certification, index) => {
              const certKey = getCertificationKey(certification);
              const resolvedLogo = certification.logo || logoOnlyByTitle[certification.title];
              const isLogoOnlyCard = Boolean(logoOnlyByTitle[certification.title]);
              const hasValidLogo = Boolean(resolvedLogo && !failedLogos[certKey]);
              const fallbackIcon = iconData[certification.iconName] || <FaUniversity />;
              const badgeLabel = badgeOverrideByTitle[certification.title]
                || badgeData[certification.iconName]
                || 'Certificate';

              return (
                <motion.a
                  key={certKey}
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certification-card"
                  aria-label={`Open certificate: ${certification.title}`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.06 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <div className="certification-logo-wrap" aria-hidden>
                    {hasValidLogo ? (
                      <img
                        src={resolvedLogo}
                        alt={`${certification.issuer} logo`}
                        className="certification-logo"
                        loading="lazy"
                        onError={() => handleLogoError(certKey)}
                      />
                    ) : isLogoOnlyCard ? (
                      <span className="certification-logo-placeholder">
                        {certification.issuer}
                      </span>
                    ) : (
                      <span className="certification-fallback-icon">{fallbackIcon}</span>
                    )}
                  </div>

                  <div className="certification-main">
                    <div className="certification-meta">
                      <span className="certification-issued">Issued {certification.issuedDate}</span>
                      <span className="certification-badge">{badgeLabel}</span>
                    </div>
                    <h3 className="certification-name">{certification.title}</h3>
                    <p className="certification-issuer">{certification.issuer}</p>
                  </div>

                  <span className="certification-cta" aria-hidden>
                    <span className="certification-cta-text">View</span>
                    <FaExternalLinkAlt />
                  </span>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
