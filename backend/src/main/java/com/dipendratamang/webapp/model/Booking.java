package com.dipendratamang.webapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String passengerName;
    @Column(nullable = false)
    private String passengerContactNumber;
    private String passengerEmail;
    @Column(nullable = false)
    private String routeFrom;
    @Column(nullable = false)
    private String routeTo;
    @Column(nullable = false)
    private LocalDate travelDate;
    @Column(nullable = false)
    private int seatNumber;
    @Column(nullable = false, updatable = false)
    private LocalDate bookingTime;

    public Booking(String passengerName, String passengerContactNumber, String passengerEmail, String routeFrom, String routeTo, int seatNumber, LocalDate travelDate) {
        this.passengerName = passengerName;
        this.passengerContactNumber = passengerContactNumber;
        this.passengerEmail = passengerEmail;
        this.routeFrom = routeFrom;
        this.routeTo = routeTo;
        this.travelDate = travelDate;
        this.seatNumber = seatNumber;
    }

    @PrePersist
    protected void onCreate() {
        this.bookingTime = LocalDate.now();
    }
}
