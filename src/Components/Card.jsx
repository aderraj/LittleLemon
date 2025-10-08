import '../Styles/Card.css';

function Card({ title, price, description, image }) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <section className="card-header">
                <h3>{title}</h3>
                <span>{price}</span>
            </section>
            <p>{description}</p>
        </div>
    );
}

export default Card;