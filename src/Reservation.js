import React, { useState, useCallback } from 'react';
import Hero from "./Components/Hero";
import ReservationForm from "./Components/ReservationForm";
import { useNavigate } from 'react-router-dom';
import { useBookings } from './contexts/BookingContext';

function Reservations() {
    const navigate = useNavigate();
    const { addBooking } = useBookings();
    const [reservationData, setReservationData] = useState(null);

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            if (typeof window.fetchAPI !== 'function' || typeof window.submitAPI !== 'function') {
                console.warn('External booking API not loaded. Using fallback implementation.');
            }
        }
    }, []);

    const submitForm = useCallback((formData) => {
        if (typeof window.submitAPI === 'function') {
            try {
                const success = window.submitAPI(formData);
                
                if (success) {
                    if (formData.payment && reservationData) {
                        addBooking(reservationData, formData.payment);
                    }
                    
                    setTimeout(() => {
                        navigate('/confirmed-booking');
                    }, 500);
                    return true;
                } else {
                    alert('❌ Booking submission failed. Please check your details and try again.');
                    return false;
                }
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error calling submitAPI:', error);
                }
                alert('⚠️ An error occurred while processing your booking. Please try again.');
                return false;
            }
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.warn('submitAPI function is not available - external script may not be loaded');
            }
            alert('🔧 Booking service is currently unavailable. Please refresh the page and try again.');
            return false;
        }
    }, [navigate, addBooking, reservationData]);

    return (
        <>
            <Hero 
                title="Reservations"
                description="Welcome to our reservation page. Here you can make your reservation."
            />
            <ReservationForm 
                submitForm={submitForm} 
                onReservationData={setReservationData}
            />
        </>
    );
}

export default Reservations;