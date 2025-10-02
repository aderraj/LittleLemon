import Menu from "./Menu";
import Testimonials from "./Testimonials";
import About from "./About";

function Main() {
    return (
        <main>
            <div className="hero">
                <section className="hero-text">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>Your favorite place for delicious meals!</p>
                    <button>Reserve a Table</button>
                </section>
                <section className="hero-image">
                    <img src="./HeroImage.png" alt="Delicious food at Little Lemon"/>
                </section>
            </div>
            <Menu />
            <Testimonials />
            <About />
        </main>
    );
}

export default Main;