package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.Event;
import com.karaokehub.karaokehub.models.User;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class VenueController {

    private final VenueRepository venueDao;
    private final EventRepository eventDao;

    public VenueController(VenueRepository venueDao, EventRepository eventDao) {
        this.venueDao = venueDao;
        this.eventDao = eventDao;
    }

    @GetMapping("/create-venue")
    public String createVenue(Model model) {
        model.addAttribute("venue", new Venue());
        model.addAttribute("event", new Event());
        return "create-venue";
    }

    @PostMapping("/create-venue")
    public String createVenue(@ModelAttribute Venue venue, @ModelAttribute Event event) {
        venueDao.save(venue);
        eventDao.save(event);
        return "redirect:/venue-profile";
    }

    @GetMapping("/venue-profile/{id}")
    public String showVenueProfile(Model model, @PathVariable long id) {
//        Venue venue = (Venue) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Venue venue = venueDao.getReferenceById(id);
        model.addAttribute("venue", venue);
        return "venue-profile";
    }

    @PostMapping("/venue-profile/update")
    public String editProfile(@ModelAttribute User user, @ModelAttribute Venue venue) {
        Venue updateVenue = venueDao.getReferenceById(venue.getId());
        updateVenue.setName(venue.getName());
        updateVenue.setCity(venue.getCity());
        updateVenue.setState(venue.getState());
        updateVenue.setZip_code(venue.getZip_code());
        venueDao.save(venue);
        return "redirect:/venue-profile";

    }


    @GetMapping("/search-venue")
    public String searchVenue(Model model) {
        List<Venue> venues = venueDao.findAll();
        model.addAttribute("venues", venues);
        return "search";
    }

    @GetMapping(value = "/search-venue-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Venue>> sendVenues() {
        List<Venue> data = venueDao.findAll();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONNECTION, "close")
                .body(data);
    }

}
