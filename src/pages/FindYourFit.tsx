import React, { useState } from 'react';
import './FindYourFit.css';
import { FaRocket, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const FindYourFit: React.FC = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeJobFit = async () => {
        if (!jobDescription.trim()) {
            setError('Please paste a job description first');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const response = await fetch('/api/analyze-fit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobDescription }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze. Please try again.');
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="find-your-fit-container">
            <div className="find-your-fit-header">
                <h1>
                    <FaRocket className="header-icon" />
                    Find Your Fit
                </h1>
                <p className="subtitle">
                    Paste a job description below and discover how Sagar can contribute to this role
                </p>
            </div>

            <div className="input-section">
                <textarea
                    className="job-description-input"
                    placeholder="Paste the job description here...

Example:
We are looking for a Data Scientist to join our team. The ideal candidate should have experience with Python, machine learning, and cloud platforms..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isLoading}
                />

                <button
                    className={`analyze-button ${isLoading ? 'loading' : ''}`}
                    onClick={analyzeJobFit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <FaRocket />
                            Analyze Fit
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <FaExclamationTriangle />
                    {error}
                </div>
            )}

            {analysis && (
                <div className="analysis-result">
                    <div className="result-header">
                        <FaCheckCircle className="success-icon" />
                        <h2>Why Sagar is a Great Fit</h2>
                    </div>
                    <div className="result-content">
                        {analysis.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindYourFit;
