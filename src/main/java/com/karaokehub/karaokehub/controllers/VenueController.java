package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.models.VenueRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

public class VenueController {
    private VenueRepository venueDao;

    @GetMapping("/create-venue")
    public String createVenue(@ModelAttribute Venue venue) {
        model.addAttribute("venue", new Venue());
        return "/create-venue";
    }

    @GetMapping("/venue-profile")
    public String venueProfile() {
        return "/venue-profile";
    }




}
