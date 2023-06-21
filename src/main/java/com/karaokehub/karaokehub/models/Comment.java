package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String body;

	@Column(nullable = true)
	private String date;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "venue_id")
	private Venue venue;

	public Comment() {
	}

	public Comment(String body, String date, User user, Venue venue) {
		this.body = body;
		this.date = date;
		this.user = user;
		this.venue = venue;
	}

	public Comment(String body, User user, Venue venue) {
		this.body = body;
		this.user = user;
		this.venue = venue;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}
}

