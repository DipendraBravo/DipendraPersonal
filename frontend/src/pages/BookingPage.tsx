// src/pages/BookingPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatSelector from '../components/SeatSelector/SeatSelector';
import { getSeatAvailability, createBooking, AvailabilityResponse, BookingPayload, BookingConfirmationData } from '../services/bookingService';

const TOTAL_SEATS_COUNT = 11; // Your vehicle's capacity

const BookingPage: React.FC = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        today.setHours(0,0,0,0); // Normalize to start of day for min attribute
        return today.toISOString().split('T')[0];
    });
    const [fromLocation, setFromLocation] = useState<string>("Birtamode");
    const [toLocation, setToLocation] = useState<string>("Ilam");

    const [seatAvailabilityData, setSeatAvailabilityData] = useState<AvailabilityResponse | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

    const [passengerName, setPassengerName] = useState<string>("");
    const [passengerPhone, setPassengerPhone] = useState<string>("");
    const [passengerEmail, setPassengerEmail] = useState<string>(""); // Added email state

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const minDate = new Date().toISOString().split('T')[0]; // Prevent booking for past dates

    const fetchSeatData = useCallback(async () => {
        if (!selectedDate || !fromLocation || !toLocation) return;

        setIsLoading(true);
        setError(null);
        setSeatAvailabilityData(null); // Clear previous data
        setSelectedSeat(null); // Reset selected seat when checking new availability
        try {
            const data = await getSeatAvailability(selectedDate, fromLocation, toLocation);
            setSeatAvailabilityData(data);
        } catch (err: any) {
            setError(err.message || "Failed to load seat availability. Please try again.");
            setSeatAvailabilityData(null);
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate, fromLocation, toLocation]);

    useEffect(() => {
        fetchSeatData();
    }, [fetchSeatData]); // fetchSeatData is now stable due to useCallback

    const handleSeatSelect = (seatNumber: number) => {
        // Prevent re-selecting if already booking to avoid issues
        if (isBooking) return;
        setSelectedSeat(prevSelected => (prevSelected === seatNumber ? null : seatNumber));
        setError(null); // Clear error when user interacts
        setSuccessMessage(null); // Clear success message
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSeat) {
            setError("Please select a seat first.");
            return;
        }
        if (!passengerName.trim() || !passengerPhone.trim()) {
            setError("Please fill in your Name and Phone Number.");
            return;
        }
        // Basic phone validation (example: Nepali numbers)
        if (!/^(98|97)\d{8}$/.test(passengerPhone.trim())) {
            setError("Please enter a valid 10-digit Nepali phone number (starting with 98 or 97).");
            return;
        }
        // Optional: Basic email validation
        if (passengerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengerEmail.trim())) {
            setError("Please enter a valid email address or leave it blank.");
            return;
        }


        setIsBooking(true);
        setError(null);
        setSuccessMessage(null);

        const payload: BookingPayload = {
            passengerName: passengerName.trim(),
            passengerPhone: passengerPhone.trim(),
            passengerEmail: passengerEmail.trim() || undefined, // Send undefined if blank
            routeFrom: fromLocation,
            routeTo: toLocation,
            travelDate: selectedDate,
            seatNumber: selectedSeat,
        };

        try {
            const bookingConfirmation: BookingConfirmationData = await createBooking(payload);
            setSuccessMessage(`Booking successful for seat ${selectedSeat}! Booking ID: ${bookingConfirmation.id}`);

            // Navigate to confirmation page with booking details
            navigate('/confirmation', {
                state: {
                    bookingDetails: bookingConfirmation // Pass the data returned by your API
                }
            });

            // Optionally reset form fields here if not navigating away immediately,
            // but since we navigate, ConfirmationPage will be the new view.
            // setSelectedSeat(null);
            // setPassengerName("");
            // setPassengerPhone("");
            // setPassengerEmail("");
            // fetchSeatData(); // Refresh seat availability (might be better on ConfirmationPage return or separate refresh button)

        } catch (err: any) {
            setError(err.message || "Booking failed. The seat might have been taken. Please try refreshing or select another seat.");
        } finally {
            setIsBooking(false);
        }
    };

    const handleFromLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFrom = e.target.value;
        setFromLocation(newFrom);
        setToLocation(newFrom === "Birtamode" ? "Ilam" : "Birtamode");
    };

    const handleToLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTo = e.target.value;
        setToLocation(newTo);
        setFromLocation(newTo === "Ilam" ? "Birtamode" : "Ilam");
    };


    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-primary">
                Book Your Seat
            </h1>

            {error && (
                <div role="alert" className="alert alert-error mb-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! {error}</span>
                </div>
            )}
            {/* Success message is typically shown on confirmation page, but can be here briefly if needed */}
            {successMessage && !isBooking && ( // Only show if not currently booking (i.e., after a successful non-navigating action)
                <div role="alert" className="alert alert-success mb-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="grid md:grid-cols-5 gap-6 mb-8">
                {/* Date and Route Selection - takes more space on larger screens */}
                <div className="md:col-span-2 card bg-base-100 shadow-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">1. Select Trip Details</h2>
                    <div className="form-control w-full mb-4">
                        <label className="label"><span className="label-text font-medium">Travel Date</span></label>
                        <input
                            type="date"
                            value={selectedDate}
                            min={minDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="input input-bordered w-full"
                            disabled={isLoading || isBooking}
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label"><span className="label-text font-medium">From</span></label>
                        <select
                            value={fromLocation}
                            onChange={handleFromLocationChange}
                            className="select select-bordered w-full"
                            disabled={isLoading || isBooking}
                        >
                            <option value="Birtamode">Birtamode</option>
                            <option value="Ilam">Ilam</option>
                        </select>
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label"><span className="label-text font-medium">To</span></label>
                        <select
                            value={toLocation}
                            onChange={handleToLocationChange}
                            className="select select-bordered w-full"
                            disabled={isLoading || isBooking}
                        >
                            <option value="Ilam">Ilam</option>
                            <option value="Birtamode">Birtamode</option>
                        </select>
                    </div>
                    <button onClick={fetchSeatData} className="btn btn-primary w-full mt-2" disabled={isLoading || isBooking}>
                        {isLoading ? <span className="loading loading-spinner"></span> : "Check Seat Availability"}
                    </button>
                </div>

                {/* Seat Selector - takes more space */}
                <div className="md:col-span-3 card bg-base-100 shadow-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">2. Select Your Seat</h2>
                    {isLoading && <div className="text-center p-4"><span className="loading loading-dots loading-lg"></span>Loading Seats...</div>}
                    {!isLoading && seatAvailabilityData && (
                        <SeatSelector
                            seatStatus={seatAvailabilityData.seatStatus}
                            totalSeatsCount={TOTAL_SEATS_COUNT}
                            selectedSeat={selectedSeat}
                            onSeatSelect={handleSeatSelect}
                        />
                    )}
                    {!isLoading && !seatAvailabilityData && !error && (
                        <p className="text-center p-4 text-gray-500">Please select trip details to see seat availability.</p>
                    )}
                    {!isLoading && selectedSeat && (
                        <p className="text-center mt-4 font-semibold text-lg">
                            You have selected seat: <span className="badge badge-primary badge-lg">{selectedSeat}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Booking Form - Spans full width below */}
            {selectedSeat && (
                <div className="card bg-base-100 shadow-xl p-6 mt-8">
                    <h2 className="text-xl font-semibold mb-4">3. Enter Your Details (for Seat: {selectedSeat})</h2>
                    <form onSubmit={handleBooking}>
                        <div className="grid sm:grid-cols-1 gap-4">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Full Name <span className="text-red-500">*</span></span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ram Bahadur"
                                    value={passengerName}
                                    onChange={e => setPassengerName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                    disabled={isBooking}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Phone Number <span className="text-red-500">*</span></span></label>
                                <input
                                    type="tel"
                                    placeholder="e.g. 98XXXXXXXX"
                                    value={passengerPhone}
                                    onChange={e => setPassengerPhone(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                    pattern="^(98|97)\d{8}$"
                                    title="10-digit Nepali number starting with 98 or 97"
                                    disabled={isBooking}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Email Address (Optional)</span></label>
                                <input
                                    type="email"
                                    placeholder="e.g. yourname@example.com"
                                    value={passengerEmail}
                                    onChange={e => setPassengerEmail(e.target.value)}
                                    className="input input-bordered w-full"
                                    disabled={isBooking}
                                />
                                <label className="label">
                                    <span className="label-text-alt">We'll send a confirmation to this email.</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-accent w-full mt-6 btn-lg" disabled={isBooking || isLoading}>
                            {isBooking ? <span className="loading loading-spinner"></span> : `Confirm Booking for Seat ${selectedSeat}`}
                        </button>
                    </form>
                </div>
            )}
            {!selectedSeat && seatAvailabilityData && !isLoading &&(
                <div className="text-center p-6 bg-base-200 rounded-box mt-8">
                    <p className="text-lg font-medium">Please select an available seat from the layout above to proceed with your booking.</p>
                </div>
            )}
        </div>
    );
};

export default BookingPage;