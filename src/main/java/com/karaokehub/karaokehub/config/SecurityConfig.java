package com.karaokehub.karaokehub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers( "create-venue", "user-profile", "profile", "profile/update", "contact", "contact-success", "song-finder").authenticated()
                .requestMatchers("register", "login", "/", "index", "logout", "search", "browse-venues", "venue/**", "venue/comment/upvote", "yelp/**", "yelpBusiness/**", "api/**", "search-venue-json", "about", "delete-venue/**").permitAll()
                .requestMatchers("css/**", "js/**", "img/**").permitAll()
        );



        http.formLogin((form) -> form
                        .loginPage("/login")
                        .successForwardUrl("/profile")
                        .failureForwardUrl("/login")
                        .defaultSuccessUrl("/profile")
                        .failureUrl("/login?error"))

                        .logout((logout) -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
        );
        http.httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
