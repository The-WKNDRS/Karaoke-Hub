package com.karaokehub.karaokehub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests((requests) -> requests
//                .requestMatchers( "/create-venue", "/user-profile", "/venue-profile", "/profile", "/profile/update").authenticated()
//                .requestMatchers("/register", "/login", "/index", "/logout", "/search-venue", "/search-venue-json").permitAll()
//                .requestMatchers("/css/**", "/js/**", "/img/**").permitAll()
//        );

       http.authorizeHttpRequests((requests) -> requests.anyRequest().permitAll());


        http.formLogin((form) -> form.loginPage("/login").defaultSuccessUrl("/index"));
        http.logout((form) -> form.logoutSuccessUrl("/login"));
        http.httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
