import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import Reservations from './Reservation';
import ConfirmationPage from './Components/ConfirmationPage';
import ConfirmedBooking from './Components/ConfirmedBooking';
import Bookings from './Components/Bookings';
import MenuPage from './Components/MenuPage';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Header> <Nav/> </Header>
        <Routes>
          <Route path="/" element={<><Main/><Footer/></>} />
          <Route path="/menu" element={<><MenuPage/><Footer/></>} />
          <Route path="/bookings" element={<><Bookings/><Footer/></>} />
          <Route path="/reservations" element={<><Reservations/><Footer/></>} />
          <Route path="/confirmation" element={<><ConfirmationPage/><Footer/></>} />
          <Route path="/confirmed-booking" element={<><ConfirmedBooking/><Footer/></>} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
