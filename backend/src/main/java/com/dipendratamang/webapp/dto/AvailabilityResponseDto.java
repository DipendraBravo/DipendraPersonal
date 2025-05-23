package com.dipendratamang.webapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityResponseDto {
    Map<Integer, String> seatStatus;
    private String routeFrom;
    private String routeTo;
    private String travelDate;
}
