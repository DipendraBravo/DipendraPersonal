// src/pages/ConfirmationPage.tsx
import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

// Define the structure of the booking details expected from BookingPage
// This should match what your backend booking creation endpoint returns
interface BookingDetailsFromState {
    id: number | string;
    passengerName: string;
    passengerPhone: string;
    passengerEmail?: string;
    routeFrom: string;
    routeTo: string;
    travelDate: string; // Expecting "YYYY-MM-DD" or ISO string
    seatNumber: number;
    bookingTime?: string; // Expecting ISO string
}

const ConfirmationPage: React.FC = () => {
    const location = useLocation();
    // Type assertion for bookingDetails from location state
    const bookingDetails = location.state?.bookingDetails as BookingDetailsFromState | undefined;

    if (!bookingDetails) {
        // If no booking details are found, redirect or show a message.
        // This prevents users from navigating directly to /confirmation without context.
        // Option 1: Redirect to booking page
        // return <Navigate to="/book" replace />;
        // Option 2: Show a message
        return (
            <div className="text-center p-10 card bg-base-100 shadow-xl max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">No Booking Information</h1>
                <p className="mb-4">
                    We couldn't find any booking details. If you just made a booking and landed here,
                    please check your email for a confirmation or contact us.
                </p>
                <div className="alert alert-warning mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Please book a seat first.</span>
                </div>
                <Link to="/book" className="btn btn-primary">Book a Seat</Link>
                <Link to="/" className="btn btn-ghost ml-2">Go Home</Link>
            </div>
        );
    }

    // Helper to format date string
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' // Specify UTC if date is just YYYY-MM-DD
            });
        } catch (e) {
            return dateString; // Fallback to original string if formatting fails
        }
    };

    const formatTime = (timeString?: string) => {
        if (!timeString) return 'N/A';
        try {
            return new Date(timeString).toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: true
            });
        } catch (e) {
            return timeString;
        }
    };

    return (
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6">
                <div className="avatar placeholder mb-4">
                    <div className="bg-success text-success-content rounded-full w-16 h-16">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-success">Booking Confirmed!</h1>
                <p className="text-lg mt-2">
                    Thank you, {bookingDetails.passengerName}, your seat is reserved.
                </p>
            </div>

            <div className="divider">Booking Details</div>

            <div className="space-y-3 text-base">
                <div className="flex justify-between"><span className="font-semibold">Booking ID:</span> <span>#{bookingDetails.id}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Passenger:</span> <span>{bookingDetails.passengerName}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Phone:</span> <span>{bookingDetails.passengerPhone}</span></div>
                {bookingDetails.passengerEmail && (
                    <div className="flex justify-between"><span className="font-semibold">Email:</span> <span>{bookingDetails.passengerEmail}</span></div>
                )}
                <div className="flex justify-between"><span className="font-semibold">Route:</span> <span>{bookingDetails.routeFrom} <span className="font-mono mx-1"> here </span> {bookingDetails.routeTo}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Travel Date:</span> <span>{formatDate(bookingDetails.travelDate)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Seat Number:</span> <span className="badge badge-primary badge-lg">{bookingDetails.seatNumber}</span></div>
                {bookingDetails.bookingTime && (
                    <div className="flex justify-between"><span className="font-semibold">Booking Time:</span> <span>{formatTime(bookingDetails.bookingTime)}</span></div>
                )}
            </div>

            <div className="divider"></div>

            <div className="mt-6 text-sm text-gray-600 bg-base-200 p-4 rounded-md">
                <p className="font-semibold">Important Information:</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Please arrive at the departure point at least 15 minutes before scheduled departure.</li>
                    <li>A confirmation has {bookingDetails.passengerEmail ? `been sent to ${bookingDetails.passengerEmail}` : "not been sent via email (no email provided)"}.</li>
                    <li>For any queries or changes, please contact us at [Your Contact Number/Email].</li>
                </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/book" className="btn btn-primary w-full sm:w-auto">Book Another Trip</Link>
                <Link to="/" className="btn btn-ghost w-full sm:w-auto">Back to Homepage</Link>
            </div>
        </div>
    );
};

export default ConfirmationPage;