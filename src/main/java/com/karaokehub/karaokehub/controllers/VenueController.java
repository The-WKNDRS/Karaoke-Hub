package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.User;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.models.VenueRepository;
import com.karaokehub.karaokehub.repository.UserRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public class VenueController {

    private UserRepository usersDao;
    private VenueRepository venueDao;

    @GetMapping("/create-venue")
    public String createVenue(Model model) {
        model.addAttribute("venue", new Venue());
        return "/create-venue";
    }

    @PostMapping("/create-venue")
    public String createVenue(@ModelAttribute Venue venue) {
//        get user from session
        User user = usersDao.findAll().get(0);
//        set user to venue
        venue.setUser(user)
;//        save venue to database
        venueDao.save(venue);
        return "redirect:/venue-profile";
    }

    @GetMapping("/venue-profile")
    public String venueProfile() {
        return "/venue-profile";
    }

    @GetMapping("/venue-profile/{id}")
    public String editVenue(@PathVariable long id, Model model) {
//        get venue by id
        Venue venue = venueDao.findById(id);
//        add venue to model
        model.addAttribute("venue", venue);
        return "/venue-profile";
    }
}
