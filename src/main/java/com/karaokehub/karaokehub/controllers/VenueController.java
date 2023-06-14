package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.Event;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.models.VenueEventDto;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.ArrayList;
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

        @GetMapping("/venue-profile")
        public String venueProfile() {
            return "venue-profile";
        }

    @GetMapping("/browse-venues")
    public String browseVenues(Model model) {
        List<Venue> venues = venueDao.findAll();
        List<VenueEventDto> venueEventList = new ArrayList<>();

        for (Venue venue : venues) {
            VenueEventDto venueEventDto = new VenueEventDto();
            venueEventDto.setVenue(venue);
            List<Event> events = eventDao.findByVenueId(venue.getId());
            venueEventDto.setEvents(events);
            venueEventList.add(venueEventDto);
        }

        model.addAttribute("venueEventList", venueEventList);
        return "browse-venues";
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
