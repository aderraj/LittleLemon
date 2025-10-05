import Hero from "./Components/Hero";
import ReservationForm from "./Components/ReservationForm";

function Reservations() {
    return (
        <>
            <Hero 
                title="Reservations"
                description="Welcome to our reservation page. Here you can make your reservation."
            />
            <ReservationForm />

        </>
    );
}

export default Reservations;