package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

@Entity
@Table (name = "users")
public class User {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false, length = 60, unique = true)
	private String username;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column
	@OneToOne
	private Venue venue;

	@Override
	public String toString() {
		return "User{" +
				"username='" + username + '\'' +
				", email='" + email + '\'' +
				", id='" + id + '\'' +
				", venue_id='" + venue + '\'' +
				'}';
	}

	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(long id, String username, String email, String password) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(long id, String username, String email, String password, Venue venue) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.venue = venue;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}
}
