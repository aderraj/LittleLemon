import Card from './Card';
import '../Styles/MenuPage.css';
import Hero from './Hero';

function MenuPage() {
    const appetizers = [
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
            title: "Hummus Platter",
            price: "$8.99",
            description: "Creamy hummus with warm pita bread, olives, and fresh vegetables.",
              image: "/HummusPlatter.png"
        },
        {
            title: "Stuffed Grape Leaves",
            price: "$9.99",
            description: "Traditional dolmades with rice, herbs, and tzatziki sauce.",
              image: "/StuffedGrapeLeaves.png"
        }
    ];

    const mainCourses = [
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
        },
        {
            title: "Lamb Souvlaki",
            price: "$22.99",
            description: "Tender marinated lamb skewers served with Greek rice, vegetables, and tzatziki sauce.",
              image: "/LambSouvlaki.png"
        },
        {
            title: "Mediterranean Chicken",
            price: "$19.99",
            description: "Herb-crusted chicken with roasted vegetables and quinoa salad.",
              image: "/MediterraneanChicken.png"
        },
        {
            title: "Seafood Pasta",
            price: "$26.99",
            description: "Fresh linguine with shrimp, scallops, and mussels in garlic sauce.",
              image: "/SeafoodPasta.png"
        },
        {
            title: "Vegetarian Platter",
            price: "$16.99",
            description: "Roasted vegetables, quinoa tabbouleh, and homemade falafel.",
              image: "/VegetarianPlatter.png"
        }
    ];

    const desserts = [
        {
            title: "Lemon Dessert",
            price: "$4.99",
            description: "Delightful lemon dessert that is both tangy and sweet.",
              image: "/LemonDessert.png"
        },
        {
            title: "Baklava",
            price: "$6.99",
            description: "Traditional Greek pastry with phyllo, nuts, and honey syrup.",
              image: "/Baklava.png"
        },
        {
            title: "Tiramisu",
            price: "$7.99",
            description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.",
              image: "/Tiramisu.png"
        },
        {
            title: "Greek Yogurt Parfait",
            price: "$5.99",
            description: "Greek yogurt layered with honey, granola, and fresh berries.",
              image: "/GreekYogurtParfait.png"
        }
    ];

    const beverages = [
        {
            title: "Greek Coffee",
            price: "$3.99",
            description: "Strong, traditional Greek coffee served with a glass of water.",
              image: "/GreekCoffee.png"
        },
        {
            title: "Fresh Lemonade",
            price: "$4.50",
            description: "Freshly squeezed lemonade with a hint of mint.",
              image: "/LemonDessert.png"
        },
        {
            title: "Mediterranean Tea",
            price: "$3.50",
            description: "Blend of Mediterranean herbs and spices.",
              image: "/GreekCoffee.png"
        },
        {
            title: "House Wine",
            price: "$8.99",
            description: "Selection of red or white wine from Mediterranean vineyards.",
              image: "/Wine.png"
        }
    ];

    return (
        <div className="menu-page">
            <Hero title="Little Lemon Menu"
                subtitle="Discover our authentic Mediterranean cuisine"
            />

            <div className="menu-section">
                <h2>Appetizers</h2>
                <div className="card-container">
                    {appetizers.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            <div className="menu-section">
                <h2>Main Courses</h2>
                <div className="card-container">
                    {mainCourses.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            <div className="menu-section">
                <h2>Desserts</h2>
                <div className="card-container">
                    {desserts.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            <div className="menu-section">
                <h2>Beverages</h2>
                <div className="card-container">
                    {beverages.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuPage;