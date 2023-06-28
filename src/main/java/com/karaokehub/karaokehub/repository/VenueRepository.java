package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.data.jpa.repository.*;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    Venue findById(long id);

    @Query("SELECT v.address, v.city, v.name, v.state, v.website, v.yelp_id, v.zip_code FROM Venue v")
    List<Object[]> fetchVenueDetails();

    @Query(
            value = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', v.id, 'address', v.address, 'city', v.city, 'name', v.name, 'state', v.state, 'website', v.website, 'yelp_id', v.yelp_id, 'zipcode', v.zip_code, 'events', e.events)) FROM venue v LEFT JOIN (SELECT venue_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'day_of_week', day_of_week, 'dj', dj, 'end_time', end_time, 'start_time', start_time)) AS events FROM events GROUP BY venue_id) e ON e.venue_id = v.id",

            nativeQuery = true
    )
    String findAllValuesNative();

    @Query(
            value = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', v.id, 'address', v.address, 'city', v.city, 'name', v.name, 'state', v.state, 'website', v.website, 'yelp_id', v.yelp_id, 'zipcode', v.zip_code, 'events', e.events)) FROM venue v LEFT JOIN (SELECT venue_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'day_of_week', day_of_week, 'dj', dj, 'end_time', end_time, 'start_time', start_time)) AS events FROM events GROUP BY venue_id) e ON e.venue_id = v.id WHERE v.zip_code LIKE ?;",

            nativeQuery = true
    )
    String findVenueByZipcodeNative(String zipcode);


    @Query(
            value = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', v.id, 'address', v.address, 'city', v.city, 'name', v.name, 'state', v.state, 'website', v.website, 'yelp_id', v.yelp_id, 'zipcode', v.zip_code, 'events', e.events)) FROM venue v LEFT JOIN (SELECT venue_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'day_of_week', day_of_week, 'dj', dj, 'end_time', end_time, 'start_time', start_time)) AS events FROM events WHERE day_of_week = (\n" +
                    "    CASE ?\n" +
                    "        WHEN 'Monday' THEN 'Mon'\n" +
                    "        WHEN 'Tuesday' THEN 'Tue'\n" +
                    "        WHEN 'Wednesday' THEN 'Wed'\n" +
                    "        WHEN 'Thursday' THEN 'Thu'\n" +
                    "        WHEN 'Friday' THEN 'Fri'\n" +
                    "        WHEN 'Saturday' THEN 'Sat'\n" +
                    "        WHEN 'Sunday' THEN 'Sun'\n" +
                    "        END\n" +
                    "    ) GROUP BY venue_id) e ON e.venue_id = v.id WHERE v.zip_code LIKE ? AND e.venue_id IS NOT NULL;",

            nativeQuery = true
    )
    String filterVenueByWeekdayNative(String weekday, String zipcode);

    @Query(
            value ="SELECT JSON_ARRAYAGG(JSON_OBJECT('id', v.id, 'address', v.address, 'city', v.city, 'name', v.name, 'state', v.state, 'website', v.website, 'yelp_id', v.yelp_id, 'zipcode', v.zip_code, 'events', e.events)) FROM venue v LEFT JOIN (SELECT venue_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'day_of_week', day_of_week, 'dj', dj, 'end_time', end_time, 'start_time', start_time)) AS events FROM events WHERE day_of_week = (CASE ? WHEN 'Monday' THEN 'Mon' WHEN 'Tuesday' THEN 'Tue' WHEN 'Wednesday' THEN 'Wed' WHEN 'Thursday' THEN 'Thu' WHEN 'Friday' THEN 'Fri' WHEN 'Saturday' THEN 'Sat' WHEN 'Sunday' THEN 'Sun' END) GROUP BY venue_id) e ON e.venue_id = v.id WHERE e.venue_id IS NOT NULL;",

            nativeQuery = true
    )
    String filterAllByWeekdayNative(String weekday);
}
