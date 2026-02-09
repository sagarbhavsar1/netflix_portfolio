import React, { useEffect } from 'react';
import './BioModal.css';
import { FaTimes } from 'react-icons/fa';

interface BioModalProps {
    isOpen: boolean;
    onClose: () => void;
    bio: string;
}

const BioModal: React.FC<BioModalProps> = ({ isOpen, onClose, bio }) => {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Split bio by double newlines for paragraphs
    const paragraphs = bio.split('\n\n');

    return (
        <div className="bio-modal-overlay" onClick={handleOverlayClick}>
            <div className="bio-modal-content">
                <button className="bio-modal-close" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>
                <div className="bio-modal-body">
                    <h2 className="bio-modal-title">About Me</h2>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="bio-modal-paragraph">
                            {paragraph.startsWith('---') ? <hr className="bio-divider" /> : paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BioModal;
