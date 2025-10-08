import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Styles/Hero.css';

function Hero({
  title = null,
  subtitle = null,
  description = null,
  children = null,
  imageSrc = null,
  imageAlt = 'Hero image',
  buttonText = null,
  buttonLink = null,
  onButtonClick = null
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

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  onButtonClick: PropTypes.func
};

export default Hero;