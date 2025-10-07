import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Menu() {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const handleOnlineMenuClick = () => {
        navigate('/menu');
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    };

const specialItems = [
    {
        title: "Greek Salad",
        price: "$12.99",
        description: "Fresh lettuce, tomatoes, cucumbers, olives, and feta cheese with olive oil dressing.",
        image: "/GreekSalad.png"
    },
    {
        title: "Bruschetta",
        price: "$5.99",
        description: "Grilled bread with fresh tomatoes, garlic, basil, and olive oil.",
        image: "/Bruschetta.png"
    },
    {
        title: "Lemon Dessert",
        price: "$4.99",
        description: "Delightful lemon dessert that is both tangy and sweet.",
        image: "/LemonDessert.png"
    },
    {
        title: "Grilled Salmon",
        price: "$24.99",
        description: "Fresh Atlantic salmon grilled to perfection, served with lemon rice and seasonal vegetables.",
        image: "/GrilledSalamon.png"
    },
    {
        title: "Moussaka",
        price: "$18.99",
        description: "Traditional Greek layered casserole with eggplant, ground beef, and béchamel sauce.",
        image: "/Moussaka.png"
    }
];

    return (
        <>
        <div className="highlights">
            <h1>This Week's Specials</h1>
            <button onClick={handleOnlineMenuClick}>Online Menu</button>
        </div>
        <div className="scrollable-menu">
            <button className="scroll-btn scroll-left" onClick={scrollLeft}>‹</button>
            <div className="scrollable-card-container" ref={scrollContainerRef}>
                {specialItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
            <button className="scroll-btn scroll-right" onClick={scrollRight}>›</button>
        </div>
    </>
    );
}

export default Menu;