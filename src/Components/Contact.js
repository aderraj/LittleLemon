import '../Styles/Contact.css';
import Hero from './Hero';
import Footer from './Footer';

function Contact() {
  return (
    <main className="contact-page">
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        description="Questions, feedback or special requests? Send us a message and we'll get back to you shortly."
        imageSrc="./GreekCoffee.png"
        imageAlt="Coffee and contact"
      />

      <section className="contact-content">
        <section className="contact-form-container">
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Write your message here..." required></textarea>
            </div>

            <div className="form-row submit-row">
              <button className="submit-button" type="submit">Send Message</button>
            </div>
          </form>
        </section>

        <aside className="contact-info">
          <div className="info-card">
            <h3>Contact Details</h3>
            <p>Address: 123 Main St, Anytown, USA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: <a href="mailto:contact@littlelemon.com">contact@littlelemon.com</a></p>
          </div>

          <div className="info-card hours">
            <h3>Opening Hours</h3>
            <ul>
              <li>Mon - Fri: 11:00 AM - 10:00 PM</li>
              <li>Sat - Sun: 9:00 AM - 11:00 PM</li>
            </ul>
          </div>

          <div className="info-card social">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="https://www.facebook.com/littlelemon">Facebook</a></li>
              <li><a href="https://www.instagram.com/littlelemon">Instagram</a></li>
              <li><a href="https://www.twitter.com/littlelemon">Twitter</a></li>
            </ul>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

export default Contact;
