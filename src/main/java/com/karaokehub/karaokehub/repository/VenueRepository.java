package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    Venue findById(long id);
}
