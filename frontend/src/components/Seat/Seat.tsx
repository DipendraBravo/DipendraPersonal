// src/components/Seat/Seat.tsx
import React from 'react';

interface SeatProps {
    seatNumber: number;
    isBooked: boolean;
    isSelected: boolean;
    onSelect: (seatNumber: number) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isBooked, isSelected, onSelect }) => {
    const handleClick = () => {
        if (!isBooked) {
            onSelect(seatNumber);
        }
    };

    let seatClass = "btn m-1 w-16 h-16 text-lg"; // DaisyUI button, ensure consistent size
    if (isBooked) {
        seatClass += " btn-disabled bg-red-600 text-white hover:bg-red-600"; // Make disabled clear
    } else if (isSelected) {
        seatClass += " btn-primary ring-2 ring-offset-2 ring-primary"; // Highlight selected
    } else {
        seatClass += " btn-outline btn-success hover:bg-green-500 hover:text-white"; // Available
    }

    return (
        <button
            className={seatClass}
            onClick={handleClick}
            disabled={isBooked}
            aria-label={`Seat ${seatNumber} ${isBooked ? 'booked' : (isSelected ? 'selected' : 'available')}`}
        >
            {seatNumber}
        </button>
    );
};

export default Seat;