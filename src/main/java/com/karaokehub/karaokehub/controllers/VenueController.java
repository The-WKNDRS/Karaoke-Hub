package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
    public class VenueController {

        private final VenueRepository venueDao;
        public VenueController(VenueRepository venueDao) {
            this.venueDao = venueDao;
        }

        @GetMapping("/create-venue")
        public String createVenue(Model model) {
            model.addAttribute("venue", new Venue());
            return "/create-venue";
        }
        @PostMapping("/create-venue")
        public String createVenue(@ModelAttribute Venue venue) {
            venueDao.save(venue);
            return "redirect:/venue-profile";
        }
    @GetMapping("/venue-profile")
    public String venueProfile() {
        return "/venue-profile";
    }

    @GetMapping("/search-venue")
    public String searchVenue() { return "/search"; }
}
