package com.karaokehub.karaokehub.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class YelpConfig {

    @Autowired
    private Environment environment;

    public String getYelpApiKey() {
        return environment.getProperty("yelp.api.key");
    }


}
