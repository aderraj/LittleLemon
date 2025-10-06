import React, { createContext, useContext, useReducer } from 'react';

// Initial bookings data (sample data)
const initialBookings = [
  {
    id: 1,
    date: 'October 15, 2025',
    time: '7:00 PM',
    guests: 4,
    occasion: 'Anniversary',
    status: 'confirmed',
    bookingNumber: 'LL2025001',
    fullName: 'John Doe',
    seatingArea: 'Indoor'
  },
  {
    id: 2,
    date: 'October 20, 2025',
    time: '6:30 PM',
    guests: 2,
    occasion: 'Date Night',
    status: 'confirmed',
    bookingNumber: 'LL2025002',
    fullName: 'Jane Smith',
    seatingArea: 'Outdoor'
  }
];

// Booking actions
const bookingActions = {
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING'
};

// Booking reducer
const bookingReducer = (state, action) => {
  switch (action.type) {
    case bookingActions.ADD_BOOKING:
      return [...state, action.payload];
    case bookingActions.UPDATE_BOOKING:
      return state.map(booking => 
        booking.id === action.payload.id ? action.payload : booking
      );
    case bookingActions.DELETE_BOOKING:
      return state.filter(booking => booking.id !== action.payload);
    default:
      return state;
  }
};

// Create context
const BookingContext = createContext();

// Booking provider component
export const BookingProvider = ({ children }) => {
  const [bookings, dispatch] = useReducer(bookingReducer, initialBookings);

  // Generate unique booking number
  const generateBookingNumber = () => {
    const year = new Date().getFullYear();
    const existingNumbers = bookings.map(b => 
      parseInt(b.bookingNumber.replace('LL', ''))
    );
    const nextNumber = Math.max(...existingNumbers, 2025000) + 1;
    return `LL${nextNumber}`;
  };

  // Add new booking
  const addBooking = (reservationData, paymentData) => {
    const newBooking = {
      id: Date.now(), // Simple ID generation
      date: reservationData.date ? new Date(reservationData.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '',
      time: reservationData.customTime || '',
      guests: reservationData.partySize || 1,
      occasion: reservationData.occasion || 'Casual',
      status: 'confirmed',
      bookingNumber: generateBookingNumber(),
      fullName: reservationData.fullName || '',
      seatingArea: reservationData.seatingArea || 'Indifferent',
      paymentInfo: {
        cardNumber: paymentData.cardNumber ? `****${paymentData.cardNumber.slice(-4)}` : '',
        nameOnCard: paymentData.nameOnCard || ''
      },
      createdAt: new Date().toISOString()
    };

    dispatch({ type: bookingActions.ADD_BOOKING, payload: newBooking });
    return newBooking;
  };

  // Update booking
  const updateBooking = (bookingId, updates) => {
    dispatch({ 
      type: bookingActions.UPDATE_BOOKING, 
      payload: { ...updates, id: bookingId }
    });
  };

  // Delete booking
  const deleteBooking = (bookingId) => {
    dispatch({ type: bookingActions.DELETE_BOOKING, payload: bookingId });
  };

  const value = {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Hook to use booking context
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;