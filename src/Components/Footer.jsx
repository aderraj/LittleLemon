import '../Styles/Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <img src="/MonoLogo.png" alt="Little Lemon Logo"/>
                <section>
                    <h4>Doormat Navigation</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/reservations">Reservations</Link></li>
                    </ul>
                </section>
                <section>
                    <h4>Contact</h4>
                    <ul>
                        <li>Address</li>
                        <li>Phone Number</li>
                        <li>Email</li>
                    </ul>
                </section>
                <section>
                    <h4>Social Media Links</h4>
                    <ul>
                        <li>Address</li>
                        <li>Phone Number</li>
                        <li>Email</li>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

export default Footer;