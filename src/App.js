import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Nav from './Nav';
function App() {
  return (
    <>
      <meta name="description" content="Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment."/>
      <meta name="og:title" content="Little Lemon"/>
      <meta name="og:description" content="Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment."/>
      <meta name="og:image" content="https://example.com/og-image.jpg"/>
      <Header> <Nav/> </Header>
      <Main/>
      <Footer/>
    </>
  );
}

export default App;
