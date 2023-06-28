package com.karaokehub.karaokehub.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class YelpKeyController {
    @Value("${yelp.api.key}")
    private String yelpApiKey;

    @GetMapping("/get-yelp-key")
    public String getApiKey() {
        return yelpApiKey;
    }
}
