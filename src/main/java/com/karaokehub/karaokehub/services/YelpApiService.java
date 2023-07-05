package com.karaokehub.karaokehub.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.karaokehub.karaokehub.config.YelpConfig;
import com.squareup.okhttp.*;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;



@Service("yelpApiService")
public class YelpApiService {
    public static YelpConfig yelpConfig;

    private static final String yelpBaseUrl = "api.yelp.com/v3";

    public YelpApiService(YelpConfig yelpConfig) {
        YelpApiService.yelpConfig = yelpConfig;
    }

    private static String makeAutoCompleteUrl(String query, String latitude, String longitude){

        //making the uri adjustable by using the UriComponentsBuilder for the request
        return UriComponentsBuilder.newInstance()
                .scheme("https").host(yelpBaseUrl).path("/businesses/search")
                .queryParam("term", query)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("radius", "40000")
                .queryParam("categories", "bars")
                .queryParam("categories", "concert")
                .queryParam("categories", "venues")
                .queryParam("categories", "stadiumsarenas")
                .queryParam("categories", "clubcrawl")
                .queryParam("categories", "comedyclubs")
                .queryParam("categories", "danceclubs")
                .queryParam("categories", "beergardens")
                .queryParam("categories", "music")
                .queryParam("sort_by", "rating")
                .queryParam("limit", "20")
                .build()
                .toUriString();
    }
    private static String makeAutoCompleteUrl(String id){
        //making the uri adjustable by using the UriComponentsBuilder for the request
        return UriComponentsBuilder.newInstance()
                .scheme("https").host(yelpBaseUrl).path("/businesses/")
                .path("/" + id)
                .queryParam("radius", "40000")
                .queryParam("sort_by", "rating")
                .queryParam("limit", "1")
                .build()
                .toUriString();
    }

    private static String makeAutoCompleteUrl(String query, String location){
        //making the uri adjustable by using the UriComponentsBuilder for the request
        return UriComponentsBuilder.newInstance()
                .scheme("https").host(yelpBaseUrl).path("/businesses/search")
                .queryParam("term", query)
                .queryParam("location", location)
                .queryParam("radius", "40000")
                .queryParam("sort_by", "rating")
                .queryParam("limit", "1")
                .build()
                .toUriString();
    }
    public static String execute(String query, String latitude, String longitude) throws IOException {
        OkHttpClient client = new OkHttpClient();
        //creating the api endpoint url
        String requestUri = makeAutoCompleteUrl(query, latitude, longitude );
        Request request = new Request.Builder()
                .url(requestUri)
                .addHeader("Access-Control-Allow-Origin","*")
                .addHeader("Authorization", "Bearer " + yelpConfig.getYelpApiKey())
                .build();

        Response response = client.newCall(request).execute();
        String responseString  = response.body().string();
        ObjectNode objectNode = new ObjectMapper()
                .readValue(responseString, ObjectNode.class);
        return objectNode.get("businesses").toPrettyString();
    }

    public static String execute(String query, String location) throws IOException {

        OkHttpClient client = new OkHttpClient();
        //creating the api endpoint url
        String requestUri = makeAutoCompleteUrl(query, location);
        Response response = client.newCall(
                        new Request.Builder()
                                .url(requestUri)
                                .addHeader("Access-Control-Allow-Origin","*")
                                .addHeader("Authorization", "Bearer " + yelpConfig.getYelpApiKey())
                                .build())
                .execute();

        String responseString  = response.body().string();
        System.out.println(responseString);
        System.out.println(yelpConfig.getYelpApiKey());
        ObjectNode objectNode = new ObjectMapper().readValue(responseString, ObjectNode.class);
        return objectNode.get("businesses").toString();
    }

    public static String execute(String id) throws IOException {

        OkHttpClient client = new OkHttpClient();
        //creating the api endpoint url
        String requestUri = makeAutoCompleteUrl(id);
        Response response = client.newCall(
                        new Request.Builder()
                                .url(requestUri)
                                .addHeader("Access-Control-Allow-Origin","*")
                                .addHeader("Authorization", "Bearer " + yelpConfig.getYelpApiKey())
                                .build())
                .execute();

        String responseString  = response.body().string();
        System.out.println(responseString);
        ObjectNode objectNode = new ObjectMapper().readValue(responseString, ObjectNode.class);
        return objectNode.toString();
    }
}

