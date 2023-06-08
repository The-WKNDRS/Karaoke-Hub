package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
public interface VenueRepository extends JpaRepository<Venue, Long> {
}
