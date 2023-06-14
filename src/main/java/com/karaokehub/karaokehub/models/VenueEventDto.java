package com.karaokehub.karaokehub.models;

import java.util.*;

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

    public String getKaraokeDays() {
        if (events == null || events.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();

        for (Event event : events) {
            sb.append(event.getDay_of_week()).append(": ")
                    .append(event.getStart_time()).append(" - ").append(event.getEnd_time())
                    .append(", ");
        }

        // Remove the trailing comma and space
        if (sb.length() > 2) {
            sb.setLength(sb.length() - 2);
        }

        return sb.toString();
    }
}