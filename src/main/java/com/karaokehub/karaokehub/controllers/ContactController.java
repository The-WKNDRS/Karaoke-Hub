package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.ContactForm;
import com.karaokehub.karaokehub.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ContactController {

    private final EmailService emailService;

    @Autowired
    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @RequestMapping(value = "/contact", method = RequestMethod.GET)
    public String showContactForm() {
        return "contact"; // Return the name of the HTML/Thymeleaf template for the contact form
    }

    @PostMapping("/contact")
    public String submitContactForm(ContactForm form) {
        // Process the form data and send the email
        emailService.sendEmail(form);

        // Redirect to a success page or another appropriate page
        return "redirect:/index"; // Replace with your desired success page URL
    }
}
