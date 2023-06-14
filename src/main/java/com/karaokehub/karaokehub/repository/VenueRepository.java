package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    Venue findById(long id);

    @Query("SELECT v.address, v.city, v.name, v.state, v.website, v.yelp_id, v.zip_code FROM Venue v")
    List<Object[]> fetchVenueDetails();
}
