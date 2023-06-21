package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	Comment findById(long id);
	List<Comment> findAllByVenueId(long venueId);
}
