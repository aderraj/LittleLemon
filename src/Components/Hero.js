import { Link } from 'react-router-dom';
import '../Styles/Main.css';

function Hero({ 
  title, 
  subtitle, 
  description, 
  children, 
  imageSrc, 
  imageAlt, 
  buttonText, 
  buttonLink, 
  onButtonClick 
}) {
  return (
    <div className="hero">
      <section className="hero-text">
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        {description && <p>{description}</p>}
        {children}
        {buttonText && (
          buttonLink ? (
            <Link to={buttonLink}>
              <button>{buttonText}</button>
            </Link>
          ) : (
            <button onClick={onButtonClick}>{buttonText}</button>
          )
        )}
      </section>
      {imageSrc && (
        <section className="hero-image">
          <img src={imageSrc} alt={imageAlt || 'Hero image'} />
        </section>
      )}
    </div>
  );
}

export default Hero;