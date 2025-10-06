import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import Reservations from './Reservation';
import ConfirmationPage from './Components/ConfirmationPage';

function App() {
  return (
    <Router>
      <Header> <Nav/> </Header>
      <Routes>
        <Route path="/" element={<><Main/><Footer/></>} />
        <Route path="/reservations" element={<><Reservations/><Footer/></>} />
        <Route path="/confirmation" element={<><ConfirmationPage/><Footer/></>} />
      </Routes>
    </Router>
  );
}

export default App;
