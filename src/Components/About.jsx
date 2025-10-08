import '../Styles/About.css';

function About() {
    return (
        <div className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-title">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                    </div>
                    <article className="about-text">
                        <p>Welcome to Little Lemon, where tradition meets taste in every dish. Nestled in the heart of the city, our restaurant celebrates the vibrant flavors of the Mediterranean, offering a menu inspired by fresh ingredients, family recipes, and warm hospitality. Whether you’re joining us for a casual lunch or a festive dinner, we invite you to savor our signature specialties and experience the joy of sharing a meal with loved ones. At Little Lemon, every visit is a celebration of good food and great company.</p>
                    </article>
                </div>
                <div className="about-images">
                    <img className="about-img-1" src='/MarioandAdrian1.png' alt="Chefs in the kitchen" />
                    <img className="about-img-2" src='/restaurantChef.png' alt="Chef preparing a salad" />
                </div>
            </div>
        </div>
    );
}

export default About;