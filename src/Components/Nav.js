import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="/about">About</a></li>
                <li><Link to="/bookings">My Bookings</Link></li>
                <li><Link to="/reservations">Make Reservation</Link></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
}
export default Nav;