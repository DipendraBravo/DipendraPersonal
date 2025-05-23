package com.dipendratamang.webapp.controller;

import com.dipendratamang.webapp.dto.AvailabilityResponseDto;
import com.dipendratamang.webapp.dto.BookingRequestDto;
import com.dipendratamang.webapp.model.Booking;
import com.dipendratamang.webapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDto bookingRequest) {
        try {

            Booking booking = bookingService.createBooking(bookingRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("Error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("ERROR", e.getMessage()));
        }
    }

    @GetMapping("/availability")
    public ResponseEntity<?> getSeatAvailability(
            @RequestParam String date,
            @RequestParam String from,
            @RequestParam String to) {
        try {
            AvailabilityResponseDto seatAvailability = bookingService.getSeatAvailability(date, from, to);
            return ResponseEntity.status(HttpStatus.OK).body(seatAvailability);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("Error", "Error Fetching Seat Availability" + e.getMessage()));
        }
    }

}
