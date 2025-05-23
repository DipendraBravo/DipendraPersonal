package com.dipendratamang.webapp.repository;

import com.dipendratamang.webapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRouteFromAndRouteToAndTravelDate(String routeFrom, String routeTo, LocalDate travelDate);

    boolean existsByRouteFromAndRouteToAndTravelDateAndSeatNumber(String routeFrom, String routeTo, LocalDate travelDate, int seatNumber);

    List<Booking> findByPassengerContactNumber(String passengerContactNumber);

    List<Booking> findByTravelDate(LocalDate travelDate);
}
