package com.karaokehub.karaokehub.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiKeyController {
    @Value("${chatgpt.api.key}")
    private String chatGptApiKey;

    @GetMapping("/get-api-key")
    public String getApiKey() {
        return chatGptApiKey;
    }
}
