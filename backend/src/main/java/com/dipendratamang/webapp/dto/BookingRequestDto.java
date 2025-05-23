package com.dipendratamang.webapp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingRequestDto {
    private String PassengerName;
    private String PassengerContactNumber;
    private String PassengerEmail;
    private String routeFrom;
    private String routeTo;
    private int seatNumber;
    private String travelDate;
}
