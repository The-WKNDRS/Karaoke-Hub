package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
	List<Event> findByVenueId(long venueId);
	Event findById(long id);
}
