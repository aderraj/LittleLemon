function Header({children}) {
    return (
        <header>
            <meta name="og:title" content="Little Lemon Restaurant"/>
             <img src="./Logo.png" alt="Little Lemon Logo" />
             {children}
        </header>
    );
}

export default Header;