package com.karaokehub.karaokehub.controllers;
import com.karaokehub.karaokehub.models.*;
import com.karaokehub.karaokehub.repository.CommentRepository;
import com.karaokehub.karaokehub.repository.EventRepository;
import com.karaokehub.karaokehub.repository.UserRepository;
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
    private final CommentRepository commentDao;
    private final UserRepository userDao;

    public VenueController(VenueRepository venueDao, EventRepository eventDao, CommentRepository commentDao, UserRepository userDao) {
        this.venueDao = venueDao;
        this.eventDao = eventDao;
        this.commentDao = commentDao;
        this.userDao = userDao;
    }

    @GetMapping("/create-venue")
    public String createVenue(Model model) {
        model.addAttribute("venue", new Venue());
        return "create-venue";
    }

    @PostMapping("/create-venue")
    public String createVenue(@ModelAttribute Venue venue) {
        venueDao.save(venue);
        return "redirect:venue-profile/" + venue.getId();
    }

    @GetMapping("/venue/{id}")
    public String venueProfile(Model model, @PathVariable long id) {
        model.addAttribute("venue", venueDao.getReferenceById(id));
        List<Event> events = eventDao.findByVenueId(id);
        model.addAttribute("events", events);
        model.addAttribute("numComments", commentDao.findAllByVenueId(id).size());
        if (commentDao.findAllByVenueId(id).size() > 0) {
            model.addAttribute("comments", commentDao.findAllByVenueId(id));
        }
        return "venue-profile";
    }

    @PostMapping("/venue/comment")
    public String venueComment(@RequestParam(name="body") String body, @RequestParam(name="venue_id") long venue_id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        user = userDao.getReferenceById(id);
        Venue venue = venueDao.getReferenceById(venue_id);
        commentDao.save(new Comment(body, user, venue));
        return "redirect:/venue/" + venue_id;
    }

    @PostMapping("/edit-venue/{id}")
    public String editVenue(@ModelAttribute Venue venue, @PathVariable long id) {
        venue = venueDao.findById(id);
        venueDao.save(venue);
        return "redirect:venue-profile/" + venue.getId();
    }


    @GetMapping("/search-venue")
    public String searchVenue(Model model) {
        List<Venue> venues = venueDao.findAll();
        model.addAttribute("venues", venues);
        return "search";
    }

    @PostMapping("/search-venue")
    public String showSearch() { return "search"; }

    @GetMapping(value = "/search-venue-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> sendVenues(@RequestParam(name = "zipcode") String zipcode, @RequestParam(name = "weekday") String weekday) {
        String data;
        System.out.println(weekday);
        if (!zipcode.equals("null") && weekday.equals("Any")) {
            data = venueDao.findVenueByZipcodeNative(zipcode);
        } else if (!zipcode.equals("null") && !weekday.equals("Any")) {
            data = venueDao.filterVenueByWeekdayNative(weekday, zipcode);
        } else if (zipcode.equals("null") && !weekday.equals("Any")) {
            data = venueDao.filterAllByWeekdayNative(weekday);
        } else {
            data = venueDao.findAllValuesNative();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONNECTION, "close")
                .body(data);
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

}
