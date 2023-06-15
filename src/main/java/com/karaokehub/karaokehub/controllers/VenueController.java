package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.Event;
import com.karaokehub.karaokehub.models.Venue;
import com.karaokehub.karaokehub.models.VenueEventDto;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.VenueRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
        return "create-venue";
    }

    @PostMapping("/create-venue")
    public String createVenue(@ModelAttribute Venue venue) {
        venueDao.save(venue);
        return "redirect:/venue-profile?id=" + venue.getId();
    }

    @GetMapping("/venue-profile")
    public String venueProfile(@RequestParam("id") long venueId, Model model) {
        Venue venue = venueDao.findById(venueId);
        if (venue != null) {
            VenueEventDto venueEventDto = new VenueEventDto();
            venueEventDto.setVenue(venue);
            List<Event> events = eventDao.findByVenueId(venue.getId());
            venueEventDto.setEvents(events);
            model.addAttribute("venueEventDto", venueEventDto);
            return "venue-profile";
        } else {
            // Handle the case where the venue is not found
            return "error"; // or any appropriate error view
        }
    }

    @PostMapping("/venue-profile")
    public String updateVenueProfile(@ModelAttribute VenueEventDto updatedVenueEventDto, Model model) {
        if (updatedVenueEventDto.getVenue() != null) {
            Venue venue = venueDao.findById(updatedVenueEventDto.getVenue().getId());
            if (venue != null) {
                // Update the venue fields
                venue.setName(updatedVenueEventDto.getVenue().getName());
                venue.setAddress(updatedVenueEventDto.getVenue().getAddress());
                venue.setCity(updatedVenueEventDto.getVenue().getCity());
                venue.setState(updatedVenueEventDto.getVenue().getState());
                venue.setZip_code(updatedVenueEventDto.getVenue().getZip_code());
                venue.setWebsite(updatedVenueEventDto.getVenue().getWebsite());
                venueDao.save(venue);

                // Update the events
                List<Event> updatedEvents = updatedVenueEventDto.getEvents();
                List<Event> existingEvents = eventDao.findByVenueId(venue.getId());

                // Remove existing events not present in the updated events list
                for (Event existingEvent : existingEvents) {
                    if (!updatedEvents.contains(existingEvent)) {
                        eventDao.delete(existingEvent);
                    }
                }

                // Save or update the updated events
                for (Event updatedEvent : updatedEvents) {
                    updatedEvent.setVenue(venue);
                    eventDao.save(updatedEvent);
                }

                // Redirect back to the venue profile
                return "redirect:/venue-profile?id=" + venue.getId();
            } else {
                // Handle the case where the venue is not found
                return "error"; // or any appropriate error view
            }
        } else {
            // Handle the case where the Venue object is null
            return "error"; // or any appropriate error view
        }
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
