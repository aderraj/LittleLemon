import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ConfirmationPage.css';
import Hero from './Hero';

// Using direct URLs for images to simplify setup.
const restaurantImageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
const googlePlayBadgeUrl = "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";
const appStoreBadgeUrl = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

// SVG Icon for the checkmark
const CheckmarkIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"/>
    </svg>
);


function ConfirmationPage() {
    return (
        <>
        <Hero title="Reservation Confirmation"
            subtitle="Thank you for choosing Little Lemon!"
        />
        <div className="confirmation-container">
            <div className="confirmation-content">
                <div className="confirmation-card">
                    <div className="confirmation-icon">
                        <CheckmarkIcon />
                    </div>
                    <div className="confirmation-summary">
                        <div className="summary-text">
                            <h1>Reservation Confirmed!</h1>
                            <p className="subtitle">Your table is booked.</p>
                            <div className="reservation-details">
                                <div className="detail-item">
                                    <span className="detail-label">Date</span>
                                    <span className="detail-value">Tuesday, October 26th</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Time</span>
                                    <span className="detail-value">7:00 PM</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Guests</span>
                                    <span className="detail-value">3 People</span>
                                </div>
                            </div>
                            <p>
                                A confirmation email was sent to your email.
                                We look forward to seeing you!
                            </p>
                            <p className="payment-info">Paid with Visa ending with 1234</p>
                        </div>
                    </div>
                </div>
                <div className="confirmation-image">
                    <img src={restaurantImageUrl} alt="Cozy restaurant interior" />
                </div>
            </div>

            <div className="actions-section">
                <h2>Before You Arrive</h2>
                <div className="actions-grid">
                    <div className="action-card">
                        <h3>Explore the Menu</h3>
                        <Link to="/menu" className="action-btn">MENU</Link>
                    </div>
                    <div className="action-card">
                        <h3>Get Directions</h3>
                        <Link to="/maps" className="action-btn">MAPS</Link>
                    </div>
                </div>
            </div>

            <div className="app-download-section">
                <h2>Download our App</h2>
                <div className="app-badges">
                    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                        <img src={googlePlayBadgeUrl} alt="Get it on Google Play" />
                    </a>
                    <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                        <img src={appStoreBadgeUrl} alt="Download on the App Store" />
                    </a>
                </div>
            </div>
        </div>
        </>
    );
}

export default ConfirmationPage;