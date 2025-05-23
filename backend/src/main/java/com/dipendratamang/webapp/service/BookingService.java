package com.dipendratamang.webapp.service;

import com.dipendratamang.webapp.dto.AvailabilityResponseDto;
import com.dipendratamang.webapp.dto.BookingRequestDto;
import com.dipendratamang.webapp.model.Booking;
import com.dipendratamang.webapp.repository.BookingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class BookingService {


    private BookingRepository bookingRepository;


    public static final int TOTAL_SEATS = 11;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Booking createBooking(BookingRequestDto bookingRequest) throws Exception {
        LocalDate travelDate = LocalDate.parse(bookingRequest.getTravelDate());

        if (bookingRequest.getSeatNumber() < 1 || bookingRequest.getSeatNumber() > 11) {
            throw new IllegalArgumentException("Seat number must be between 1 and 11");
        }

        boolean alreadyBooked = bookingRepository.existsByRouteFromAndRouteToAndTravelDateAndSeatNumber(
                bookingRequest.getRouteFrom(),
                bookingRequest.getRouteTo(),
                travelDate,
                bookingRequest.getSeatNumber()
        );

        if (alreadyBooked) {
            throw new Exception("Seat " + bookingRequest.getSeatNumber() + " is already booked for this date and route.");
        }

        Booking booking = new Booking(
                bookingRequest.getPassengerName(),
                bookingRequest.getPassengerContactNumber(),
                bookingRequest.getPassengerEmail(),
                bookingRequest.getRouteFrom(),
                bookingRequest.getRouteTo(),
                bookingRequest.getSeatNumber(),
                travelDate
        );

        Booking savedBooking = bookingRepository.save(booking);
        return savedBooking;
    }

    public AvailabilityResponseDto getSeatAvailability(String dateStr, String from, String to) throws Exception {
        LocalDate travelDate = LocalDate.parse(dateStr);
        List<Booking> bookingsOnDate = bookingRepository.findByRouteFromAndRouteToAndTravelDate(from, to, travelDate);
        Set<Integer> bookedSeatNumbers = bookingsOnDate.stream().map(Booking::getSeatNumber).collect(Collectors.toSet());


        Map<Integer, String> seatStatus= new HashMap<>();
        for( int i =1; i<=TOTAL_SEATS; i++){
            if(bookedSeatNumbers.contains(i)){
                seatStatus.put(i, "booked");
            }else{
                seatStatus.put(i, "available");
            }

        }

        return new AvailabilityResponseDto(seatStatus,from,to,dateStr);

    }


}
