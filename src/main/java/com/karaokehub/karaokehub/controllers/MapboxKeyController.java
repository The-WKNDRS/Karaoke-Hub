package com.karaokehub.karaokehub.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;


    @RestController
    @RequestMapping("/api")
    public class MapboxKeyController {
        @Value("${mapbox.api.key}")
        private String mapboxApiKey;

        @GetMapping("/get-mapbox-api-key")
        public String getMapboxApiKey() {
            return mapboxApiKey;
        }
    }

