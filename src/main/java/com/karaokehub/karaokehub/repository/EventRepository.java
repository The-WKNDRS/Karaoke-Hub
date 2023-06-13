package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
	Event findById(long id);
}
