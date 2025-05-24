// src/services/bookingService.ts

// const API_BASE_URL = "http://localhost:8080/api"; // Ensure your Vercel env var is VITE_API_BASE_URL if using Vite
const API_BASE_URL = "https://api.dipendratamang.com.np/api"; // Ensure your Vercel env var is VITE_API_BASE_URL if using Vite

interface SeatStatusMap {
    [seatNumber: string]: 'available' | 'booked';
}

export interface AvailabilityResponse { // This is what your backend's AvailabilityResponseDto maps to
    seatStatus: SeatStatusMap;
    routeFrom: string;
    routeTo: string;
    travelDate: string;
}

export interface BookingPayload {
    passengerName: string;
    passengerContactNumber: string;
    passengerEmail?: string; // Make email optional here if it's optional in backend
    routeFrom: string;
    routeTo: string;
    travelDate: string; // YYYY-MM-DD
    seatNumber: number;
}

// This is the expected structure of the response from your backend's createBooking endpoint
export interface BookingConfirmationData {
    id: number;
    passengerName: string;
    passengerContactNumber: string;
    passengerEmail?: string;
    routeFrom: string;
    routeTo: string;
    travelDate: string; // Typically an ISO date string or YYYY-MM-DD
    seatNumber: number;
    bookingTime: string; // Typically an ISO datetime string
}


export const getSeatAvailability = async (date: string, from: string, to: string): Promise<AvailabilityResponse> => {
    const response = await fetch(`${API_BASE_URL}/bookings/availability?date=${date}&from=${from}&to=${to}`);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response from server.' }));
        throw new Error(errorData.message || errorData.error || 'Failed to fetch seat availability. Status: ' + response.status);
    }
    return response.json();
};

export const createBooking = async (payload: BookingPayload): Promise<BookingConfirmationData> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response from server.' }));
        throw new Error(errorData.message || errorData.error || 'Failed to create booking. Seat might be taken. Status: ' + response.status);
    }
    return response.json();
};