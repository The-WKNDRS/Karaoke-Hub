package com.karaokehub.karaokehub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {
    @Value("${chatgpt.api.key}")
    private String chatGptApiKey;

    @Value("${mapbox.api.key}")
    private String mapboxApiKey;

    public String getChatGptApiKey() {
        return chatGptApiKey;
    }

    public String getMapboxApiKey() {
        return mapboxApiKey;
    }
}
