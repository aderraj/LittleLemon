import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BookingProvider, useBookings } from '../BookingContext';

const wrapper = ({ children }) => <BookingProvider>{children}</BookingProvider>;

describe('BookingContext', () => {
  test('provides initial bookings', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    expect(result.current.bookings).toBeDefined();
    expect(Array.isArray(result.current.bookings)).toBe(true);
    expect(result.current.bookings.length).toBeGreaterThan(0);
  });

  test('adds a new booking', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    const initialLength = result.current.bookings.length;
    
    const newReservation = {
      fullName: 'Test User',
      date: new Date('2025-10-25'),
      customTime: '19:00',
      partySize: 4,
      occasion: 'Birthday',
      seatingArea: 'Indoor'
    };
    
    const paymentInfo = {
      nameOnCard: 'Test User',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123'
    };
    
    act(() => {
      result.current.addBooking(newReservation, paymentInfo);
    });
    
    expect(result.current.bookings.length).toBe(initialLength + 1);
    expect(result.current.bookings[result.current.bookings.length - 1].fullName).toBe('Test User');
  });

  test('updates an existing booking', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    const bookingToUpdate = result.current.bookings[0];
    const updatedBooking = {
      ...bookingToUpdate,
      guests: 6,
      occasion: 'Birthday'
    };
    
    act(() => {
      result.current.updateBooking(updatedBooking);
    });
    
    const updated = result.current.bookings.find(b => b.id === bookingToUpdate.id);
    expect(updated.guests).toBe(6);
    expect(updated.occasion).toBe('Birthday');
  });

  test('deletes a booking', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    const initialLength = result.current.bookings.length;
    const bookingToDelete = result.current.bookings[0];
    
    act(() => {
      result.current.deleteBooking(bookingToDelete.id);
    });
    
    expect(result.current.bookings.length).toBe(initialLength - 1);
    expect(result.current.bookings.find(b => b.id === bookingToDelete.id)).toBeUndefined();
  });

  test('gets booking by id', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    const firstBooking = result.current.bookings[0];
    const foundBooking = result.current.getBookingById(firstBooking.id);
    
    expect(foundBooking).toEqual(firstBooking);
  });

  test('returns undefined for non-existent booking id', () => {
    const { result } = renderHook(() => useBookings(), { wrapper });
    
    const foundBooking = result.current.getBookingById(99999);
    
    expect(foundBooking).toBeUndefined();
  });
});
