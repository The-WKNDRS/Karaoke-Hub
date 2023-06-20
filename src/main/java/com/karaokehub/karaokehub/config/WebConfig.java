package com.karaokehub.karaokehub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.core.io.Resource;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converters.add(converter);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/js/**", "/css/**", "/images/**")
				.addResourceLocations("classpath:/static/js/", "classpath:/static/css/")
				.setCachePeriod(3600)
				.resourceChain(true)
				.addResolver(new PathResourceResolver() {

					protected MediaType getMediaType(Resource resource) {
						if (resource.getFilename().endsWith(".js")) {
							return MediaType.valueOf("application/javascript");
						} else if (resource.getFilename().endsWith(".css")) {
							return MediaType.valueOf("text/css");
						} else {
							return MediaType.APPLICATION_OCTET_STREAM; // Default MediaType for unrecognized file types
						}
					}
				});
	}
}

