package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

@Entity
@Table(name="events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false, length = 100)
	private String day_of_week;

	@Column(nullable = false, length = 10)
	private String start_time;

	@Column(nullable = false, length = 10)
	private String end_time;

	@Column(length = 100)
	private String dj;

	@ManyToOne
	@JoinColumn(name = "venue_id")
	private Venue venue;

	public Event() {
	}

	public Event(String day_of_week, String start_time, String end_time, Venue venue) {
		this.day_of_week = day_of_week;
		this.start_time = start_time;
		this.end_time = end_time;
		this.venue = venue;
	}


	public Event(String day_of_week, String start_time, String end_time, String dj, Venue venue) {
		this.day_of_week = day_of_week;
		this.start_time = start_time;
		this.end_time = end_time;
		this.dj = dj;
		this.venue = venue;
	}

	public Event(long id, String day_of_week, String start_time, String end_time, String dj, Venue venue) {
		this.id = id;
		this.day_of_week = day_of_week;
		this.start_time = start_time;
		this.end_time = end_time;
		this.dj = dj;
		this.venue = venue;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}

	public String getDay_of_week() {
		return day_of_week;
	}

	public void setDay_of_week(String day_of_week) {
		this.day_of_week = day_of_week;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getDj() {
		return dj;
	}

	public void setDj(String dj) {
		this.dj = dj;
	}
}
