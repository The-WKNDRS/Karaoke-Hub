package com.karaokehub.karaokehub.models;

import java.util.List;

public class VenueEventDto {

    private Venue venue;
    private List<Event> events;

    public VenueEventDto() {
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
