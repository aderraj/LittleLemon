import Menu from "./Menu";
import Testimonials from "./Testimonials";
import About from "./About";
import Hero from "./Hero";
import '../Styles/Main.css';

function Main() {
    return (
        <main>
            <Hero 
                title="Little Lemon"
                subtitle="Chicago"
                description="Your favorite place for delicious meals!"
                buttonText="Reserve a Table"
                buttonLink="/reservations"
                imageSrc="./HeroImage.png"
                imageAlt="Delicious food at Little Lemon"
            />
            <Menu />
            <Testimonials />
            <About />
        </main>
    );
}

export default Main;