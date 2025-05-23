// src/components/SeatSelector/SeatSelector.tsx
import React from 'react';
import Seat from '../Seat/Seat'; // Import the Seat component

interface SeatData {
    [seatNumber: string]: 'available' | 'booked'; // API returns string keys for the map
}

interface SeatSelectorProps {
    seatStatus: SeatData | null; // Map of seat number to its status ('available', 'booked')
    totalSeatsCount: number;
    selectedSeat: number | null;
    onSeatSelect: (seatNumber: number) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
                                                       seatStatus,
                                                       totalSeatsCount,
                                                       selectedSeat,
                                                       onSeatSelect,
                                                   }) => {
    if (!seatStatus) {
        return <div className="text-center p-4">Loading seat information...</div>;
    }

    const seatNumbers = Array.from({ length: totalSeatsCount }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 justify-center p-1 sm:p-4 bg-base-200 rounded-box">
            {/* You can add visual cues for front/driver side if needed */}
            {/* e.g. <div className="col-span-full text-center text-sm mb-2">Front of Vehicle (Driver Side)</div> */}
            {seatNumbers.map((seatNum) => {
                const status = seatStatus[seatNum.toString()] || 'available'; // Default to available if not in map (should not happen with good API)
                const isBooked = status === 'booked';

                return (
                    <Seat
                        key={seatNum}
                        seatNumber={seatNum}
                        isBooked={isBooked}
                        isSelected={selectedSeat === seatNum}
                        onSelect={onSeatSelect}
                    />
                );
            })}
        </div>
    );
};

export default SeatSelector;