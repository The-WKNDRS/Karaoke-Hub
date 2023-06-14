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
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 4)
    private String state;

    @Column(nullable = false, length = 6)
    private String zip_code;

    @Column(length = 100)
    private String website;

    @Column(length = 100)
    private String yelp_id;

    public Venue() {
    }

    public Venue(long id, String name, String address, String city, String state, String zip_code, String website, String yelp_id) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.website = website;
        this.yelp_id = yelp_id;
    }

    public Venue(String name, String address, String city, String state, String zip_code, String website, String yelp_id) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.website = website;
        this.yelp_id = yelp_id;
    }

    public Venue(String name, String address, String city, String state, String zip_code, String website) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.website = website;
    }

    public Venue(String name, String address, String city, String state, String zip_code) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getYelp_id() {
        return yelp_id;
    }

    public void setYelp_id(String yelp_id) {
        this.yelp_id = yelp_id;
    }
}