import Card from './Card';

function Menu() {
    return (
        <>
        <div className="highlights">
            <h1>This Week's Specials</h1>
            <button>Online Menu</button>
        </div>
        <div className="card-container">
            <Card
                title="Greek Salad"
                price="$12.99"
                description="A refreshing salad with crispy lettuce, tomatoes, cucumbers, olives, and feta cheese, dressed with olive oil and oregano."
                image="./greek-salad.jpg"
            />
            <Card
                title="Bruschetta"
                price="$5.99"
                description="Grilled bread topped with fresh tomatoes, garlic, basil, and olive oil. A perfect appetizer to start your meal."
                image="./bruschetta.jpg"
            />
            <Card
                title="Lemon Dessert"
                price="$4.99"
                description="A delightful lemon-flavored dessert that is both tangy and sweet, perfect for satisfying your sweet tooth."
                image="./lemon-dessert.jpg"
            />
        </div>
    </>
    );
}

export default Menu;