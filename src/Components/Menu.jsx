import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import '../Styles/Menu.css';

function Menu() {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const specialItems = [
        {
            title: "Greek Salad",
            price: "$12.99",
            description: "A refreshing Greek salad featuring crisp romaine lettuce, juicy cherry tomatoes, crunchy cucumbers, briny Kalamata olives, and creamy feta cheese, all tossed in a light olive oil and oregano dressing.",
            image: "/GreekSalad.png"
        },
        {
            title: "Bruschetta",
            price: "$5.99",
            description: "Toasted artisanal bread topped with a vibrant mix of diced tomatoes, fresh basil, minced garlic, and extra virgin olive oil, finished with a sprinkle of sea salt.",
            image: "/Bruschetta.png"
        },
        {
            title: "Lemon Dessert",
            price: "$4.99",
            description: "A zesty lemon dessert made with fresh lemon zest and juice, layered with a buttery crust and topped with a light meringue, offering a perfect balance of tart and sweet flavors.",
            image: "/LemonDessert.png"
        },
        {
            title: "Grilled Salmon",
            price: "$24.99",
            description: "Succulent Atlantic salmon fillet grilled to perfection, served alongside fluffy lemon-infused rice and a medley of seasonal vegetables, drizzled with a herb-infused olive oil.",
            image: "/GrilledSalmon.png"
        },
        {
            title: "Moussaka",
            price: "$18.99",
            description: "Traditional Greek moussaka, a hearty casserole of layered eggplant, seasoned ground beef, rich tomato sauce, and a creamy béchamel topping, baked until golden and bubbling.",
            image: "/Moussaka.png"
        }
    ];

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const hasOverflow = container.scrollWidth > container.clientWidth;
            setShowRightButton(hasOverflow && container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
            setShowLeftButton(container.scrollLeft > 0);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            checkScroll();
        }, 100);

        window.addEventListener('resize', checkScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScroll);
        };
    }, [specialItems]);

    const handleOnlineMenuClick = () => {
        navigate('/menu');
    };

    const handleScroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="menu-section">
            <div className="highlights">
                <h1>This Week's Specials</h1>
                <button onClick={handleOnlineMenuClick}>Online Menu</button>
            </div>
            <div className="scrollable-menu">
                {showLeftButton && (
                    <button className="scroll-btn scroll-left" onClick={() => handleScroll(-300)}>‹</button>
                )}
                <div
                    className="scrollable-card-container"
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                >
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
                {showRightButton && (
                    <button className="scroll-btn scroll-right" onClick={() => handleScroll(300)}>›</button>
                )}
            </div>
        </div>
    );
}

export default Menu;