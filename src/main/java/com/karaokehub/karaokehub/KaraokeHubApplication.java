package com.karaokehub.karaokehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})
public class KaraokeHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(KaraokeHubApplication.class, args);
	}

}
