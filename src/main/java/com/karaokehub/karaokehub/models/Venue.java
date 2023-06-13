package com.karaokehub.karaokehub.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String location;

//    @Column
//    private long yelp_id;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "venue")
//    private List<Event> events;

//    @Override
//    public String toString() {
//        return "Venue{" +
//                "name='" + name + '\'' +
//                ", location='" + location + '\'' +
//                ", id='" + id + '\'' +
//                '}';
//    }
    @Override
    public String toString() {
        return "Venue [name=" + name + ", location=" + location + ", id=" + id + "]";
    }


    public Venue() {
    }

    public Venue(String name, String location) {
        this.name = name;
        this.location = location;
    }

//    public Venue(String name, String location, List<Event> events) {
//        this.name = name;
//        this.location = location;
//        this.events = events;
//    }

//    public Venue(Long id, String name, String location, long yelp_id) {
//        this.id = id;
//        this.name = name;
//        this.location = location;
//        this.yelp_id = yelp_id;
//    }

    public Venue(Long id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }

//    public Venue(Long id, String name, String location, long yelp_id, List<Event> events) {
//        this.id = id;
//        this.name = name;
//        this.location = location;
//        this.yelp_id = yelp_id;
//        this.events = events;
//    }




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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

//    public long getYelp_id() {
//        return yelp_id;
//    }
//
//    public void setYelp_id(long yelp_id) {
//        this.yelp_id = yelp_id;
//    }

//    public List<Event> getEvents() {
//        return events;
//    }
//
//    public void setEvents(List<Event> events) {
//        this.events = events;
//    }
}