package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.Event;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

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
            return "/create-venue";
        }

        @PostMapping("/create-venue")
        public String createVenue(@ModelAttribute Venue venue, @ModelAttribute Event event) {
            venueDao.save(venue);
            eventDao.save(event);
            return "redirect:/venue-profile";
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
