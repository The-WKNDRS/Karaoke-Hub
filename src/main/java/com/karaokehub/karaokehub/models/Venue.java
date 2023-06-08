package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="venues")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = true, length = 100, unique = true)
    private long yelp_id;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne
    private User user;

    public Venue() {
    }

    public Venue(String name, String location){
        this.name = name;
        this.location = location;
    }
    public Venue(long id, String name, String location, User user){
        this.id = id;
        this.name = name;
        this.location = location;
        this.user = user;
    }

    public Venue(long id, String name, String location, long yelp_id, User user) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.yelp_id = yelp_id;
        this.user = user;
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


    public long getYelp_id() {
        return yelp_id;
    }

    public void setYelp_id(long yelp_id) {
        this.yelp_id = yelp_id;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


}