import '../Styles/Card.css';

function Card({ title, price, description, image }) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <section className="card-header">
                <h4>{title}</h4>
                <span>{price}</span>
            </section>
            <p>{description}</p>
            <button>Order a delivery</button>
        </div>
    );
}

export default Card;