package com.karaokehub.karaokehub.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class ChatGPTConfig {

    @Autowired
    private Environment environment;

    public String getChatGptApiKey() {
        return environment.getProperty("chatgpt.api.key");
    }
}


