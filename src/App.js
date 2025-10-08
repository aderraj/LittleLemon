import './Styles/brand.css';
import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import Reservations from './Reservation';
import ConfirmationPage from './Components/ConfirmationPage';
import ConfirmedBooking from './Components/ConfirmedBooking';
import Bookings from './Components/Bookings';
import MenuPage from './Components/MenuPage';
import Contact from './Components/Contact';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<><HomePage/><Footer/></>} />
          <Route path="/menu" element={<><MenuPage/><Footer/></>} />
          <Route path="/bookings" element={<><Bookings/><Footer/></>} />
          <Route path="/reservations" element={<><Reservations/><Footer/></>} />
          <Route path="/contact" element={<><Contact/><Footer/></>} />
          <Route path="/confirmation" element={<><ConfirmationPage/><Footer/></>} />
          <Route path="/confirmed-booking" element={<><ConfirmedBooking/><Footer/></>} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
