function Footer() {
    return (
        <footer>
            <img src="Logo.png" alt="Little Lemon Logo"/>
            <section>
                <h4>Doormat Navigation</h4>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Menu</li>
                    <li>Reservations</li>
                    <li>Order Online</li>
                    <li>Login</li>
                </ul>
            </section>
            <section>
                <h4>Contact</h4>
                <ul>
                    <li>Address: 123 Main St, Anytown, USA</li>
                    <li>Phone: (123) 456-7890</li>
                    <li>Email: <a href="mailto:contact@littlelemon.com">contact@littlelemon.com</a></li>
                </ul>
            </section>
            <section>
                <h4>Social Media Links</h4>
                <ul>
                    <li><a href="https://www.facebook.com/littlelemon">Facebook</a></li>
                    <li><a href="https://www.instagram.com/littlelemon">Instagram</a></li>
                    <li><a href="https://www.twitter.com/littlelemon">Twitter</a></li>
                </ul>
            </section>
            <p>&copy; 2024 Little Lemon. All rights reserved.</p>
        </footer>
    );
}

export default Footer;