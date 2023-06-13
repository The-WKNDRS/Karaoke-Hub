package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

@Entity
@Table(name="events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(length = 100)
	private String date;

	@Column(nullable = false)
	private String description;

	@Column(length = 100)
	private String dj;

	@ManyToOne
	@JoinColumn(name = "venue_id")
	private Venue venue;

	public Event() {
	}

	public Event(String name, String date, String description, String dj, Venue venue) {
		this.name = name;
		this.date = date;
		this.description = description;
		this.dj = dj;
		this.venue = venue;
	}

	public Event(long id, String name, String date, String description, String dj, Venue venue) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.description = description;
		this.dj = dj;
		this.venue = venue;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDj() {
		return dj;
	}

	public void setDj(String dj) {
		this.dj = dj;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}
}
