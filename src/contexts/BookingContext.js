import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

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

const bookingActions = {
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING'
};

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

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, dispatch] = useReducer(bookingReducer, initialBookings);

  const generateBookingNumber = () => {
    const existingNumbers = bookings.map(b => 
      parseInt(b.bookingNumber.replace('LL', ''))
    );
    const nextNumber = Math.max(...existingNumbers, 2025000) + 1;
    return `LL${nextNumber}`;
  };

  const addBooking = (reservationData, paymentData) => {
    const newBooking = {
      id: Date.now(),
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

  const updateBooking = (updatedBooking) => {
    dispatch({ 
      type: bookingActions.UPDATE_BOOKING, 
      payload: updatedBooking
    });
  };

  const deleteBooking = (bookingId) => {
    dispatch({ type: bookingActions.DELETE_BOOKING, payload: bookingId });
  };

  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === bookingId);
  };

  const value = {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    getBookingById
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default BookingContext;