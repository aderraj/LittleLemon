import { Link } from 'react-router-dom';
import '../Styles/Header.css'

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
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
            <Link to="/">
                <img src="/Logo.png" alt="Little Lemon Logo" />
            </Link>
            <Nav />
        </header>
    );
}

export default Header;