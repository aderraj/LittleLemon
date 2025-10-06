import React, { useState } from 'react';
import Hero from "./Components/Hero";
import ReservationForm from "./Components/ReservationForm";
import { useNavigate } from 'react-router-dom';
import { useBookings } from './contexts/BookingContext';

function Reservations() {
    const navigate = useNavigate();
    const { addBooking } = useBookings();
    const [reservationData, setReservationData] = useState(null);

    // Debug: Check if API functions are available
    React.useEffect(() => {
        console.log('Checking API availability...');
        console.log('window.fetchAPI exists:', typeof window.fetchAPI === 'function');
        console.log('window.submitAPI exists:', typeof window.submitAPI === 'function');
        
        if (typeof window.fetchAPI === 'function') {
            console.log('Testing fetchAPI with today\'s date...');
            const testDate = new Date();
            const result = window.fetchAPI(testDate);
            console.log('fetchAPI test result:', result);
        }
    }, []);

    // Function to submit the booking form to the API
    const submitForm = (formData) => {
        console.log('Attempting to submit booking data:', formData);
        
        // Check if the submitAPI function is available from the external script
        if (typeof window.submitAPI === 'function') {
            console.log('submitAPI function found, calling API...');
            try {
                const success = window.submitAPI(formData);
                console.log('API call result:', success);
                
                if (success) {
                    // Save the booking to our state management
                    if (formData.payment && reservationData) {
                        console.log('Saving booking with reservation data:', reservationData);
                        console.log('Payment data:', formData.payment);
                        
                        const newBooking = addBooking(reservationData, formData.payment);
                        console.log('Booking saved:', newBooking);
                    }
                    
                    // Navigate to the booking confirmation page if submission is successful
                    console.log('API submission successful, navigating to confirmation');
                    setTimeout(() => {
                        navigate('/confirmed-booking');
                    }, 500); // Small delay to show processing
                    return true;
                } else {
                    // Handle submission failure
                    console.error('API returned false - submission failed');
                    alert('❌ Booking submission failed. Please check your details and try again.');
                    return false;
                }
            } catch (error) {
                console.error('Error calling submitAPI:', error);
                alert('⚠️ An error occurred while processing your booking. Please try again.');
                return false;
            }
        } else {
            // API is not available - show error message
            console.error('submitAPI function is not available - external script may not be loaded');
            alert('🔧 Booking service is currently unavailable. Please refresh the page and try again.');
            return false;
        }
    };
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