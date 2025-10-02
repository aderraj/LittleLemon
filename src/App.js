import './Styles/App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Nav from './Components/Nav';

function App() {
  return (
    <>
      <Header> <Nav/> </Header>
      <Main/>
      <Footer/>
    </>
  );
}

export default App;
