import '../Styles/Testimonials.css';

function Testimonials() {
    return (
        <section className="testimonials">
            <h1>What Our Customers Say</h1>
            <div className="testimonial-cards">
                <div className="testimonial-card">
                    <h2 className="rating">Rating: 5/5 <img src="/star.ico" alt="Star Rating" /></h2>
                    <div className="user-profile">
                        <img src="/Customer1.png" alt="Customer Avatar" />
                        <h3>John D.</h3>
                    </div>
                    <p>"The food was absolutely wonderful, from preparation to presentation, very pleasing."</p>
                </div>
                <div className="testimonial-card">
                    <h2 className="rating">Rating: 5/5 <img src="/star.ico" alt="Star Rating" /></h2>
                    <div className="user-profile">
                        <img src="/Customer2.png" alt="Customer Avatar" />
                        <h3>Sarah K.</h3>
                    </div>
                    <p>"A delightful experience! The ambiance and service were top-notch."</p>
                </div>
                <div className="testimonial-card">
                    <h2 className="rating">Rating: 5/5 <img src="/star.ico" alt="Star Rating" /></h2>
                    <div className="user-profile">
                        <img src="/Customer3.png" alt="Customer Avatar" />
                        <h3>Lisa M.</h3>
                    </div>
                    <p>"I love the variety on the menu. There's something for everyone!"</p>
                </div>
                <div className="testimonial-card">
                    <h2 className="rating">Rating: 4/5 <img src="/star.ico" alt="Star Rating" /></h2>
                    <div className="user-profile">
                        <img src="/Customer4.png" alt="Customer Avatar" />
                        <h3>Mike P.</h3>
                    </div>
                    <p>"Great atmosphere and friendly staff. Will definitely come back!"</p>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;