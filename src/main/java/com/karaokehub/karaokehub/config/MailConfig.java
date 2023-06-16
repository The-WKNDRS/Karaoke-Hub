package com.karaokehub.karaokehub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.example.com"); // Replace with your SMTP server hostname
        mailSender.setPort(587); // Replace with the SMTP server port
        mailSender.setUsername("your-email@example.com"); // Replace with your email address
        mailSender.setPassword("your-email-password"); // Replace with your email password

        // Additional mail sender configuration
        // ...

        return mailSender;
    }
}
