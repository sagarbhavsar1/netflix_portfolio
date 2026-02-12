import React from 'react';
import { motion } from 'framer-motion';
import './LogoCarousel.css';

const logos = [
    { src: '/logos/juliusedu_logo.jpeg', alt: 'Julius Education' },
    { src: '/logos/ondecklogo.png', alt: 'On Deck' },
    { src: '/logos/nyufubin center.png', alt: 'NYU Fubon Center' },
    { src: '/logos/rangr_data_logo.jpeg', alt: 'Rangr Data' },
    { src: '/logos/srm logo ist.jpeg', alt: 'SRM IST' },
    { src: '/logos/stern logo.jpg', alt: 'NYU Stern' },
    { src: '/logos/highradiuslogo.jpeg', alt: 'HighRadius' },
    { src: '/logos/esmech logo.webp', alt: 'Esmech' },
    { src: '/logos/easytransfer logo.png', alt: 'EasyTransfer' },
];

const LogoCarousel: React.FC = () => {
    // Double the logos for seamless infinite scroll
    const allLogos = [...logos, ...logos];

    return (
        <div className="logo-carousel-section">
            <motion.p
                className="carousel-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Worked with
            </motion.p>

            <div className="logo-carousel-container">
                <div className="logo-carousel-gradient left" />
                <div className="logo-carousel-track">
                    {allLogos.map((logo, index) => (
                        <motion.div
                            key={index}
                            className="logo-item"
                            whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                        >
                            <img src={logo.src} alt={logo.alt} />
                        </motion.div>
                    ))}
                </div>
                <div className="logo-carousel-gradient right" />
            </div>
        </div>
    );
};

export default LogoCarousel;
