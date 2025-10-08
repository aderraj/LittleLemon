import { Link } from 'react-router-dom';
import '../Styles/Header.css'

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/bookings">My Bookings</Link></li>
                <li><Link to="/reservations">Make Reservation</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

function Header() {
    return (
        <header>
            <meta name="og:title" content="Little Lemon Restaurant"/>
             <img src="./Logo.png" alt="Little Lemon Logo" />
            <Nav />
        </header>
    );
}

export default Header;