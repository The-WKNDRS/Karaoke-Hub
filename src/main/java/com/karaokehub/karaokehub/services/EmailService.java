package com.karaokehub.karaokehub.services;

import com.karaokehub.karaokehub.models.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(ContactForm form) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("cd1292ad1c-2c11cc@inbox.mailtrap.io"); // Replace with your email address or the desired recipient
        message.setSubject("New Contact Form Submission");
        message.setText(
                "Name: " + form.getName() +
                        "\nEmail: " + form.getEmail() +
                        "\nMessage: " + form.getMessage()
        );

        javaMailSender.send(message);
    }
}
