package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.Event;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
        public String venueProfile(Model model, @PathVariable long id) {
            model.addAttribute("venue", venueDao.getReferenceById(id));
            return "venue-profile";
        }


        @GetMapping("/search-venue")
        public String searchVenue(Model model) {
            List<Venue> venues = venueDao.findAll();
            model.addAttribute("venues", venues);
            return "search";
        }

        @PostMapping("/search-venue")
        public String showSearch() {
            return "search";
        }

        @GetMapping(value = "/search-venue-json", produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<String> sendVenues() {
            String data = venueDao.findAllValuesNative();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONNECTION, "close")
                    .body(data);
        }

}
