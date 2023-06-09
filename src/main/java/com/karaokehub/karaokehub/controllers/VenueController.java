package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.repository.VenueRepository;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VenueController {
    private VenueRepository venueDao;

    @GetMapping("/create-venue")
    public String createVenue() {
        return "/create-venue";
    }

    @GetMapping("/venue-profile")
    public String venueProfile() {
        return "/venue-profile";
    }

    @GetMapping("/search-venue")
    public String searchVenue() {
        return "/search";
    }

}
