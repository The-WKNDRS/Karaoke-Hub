package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.ContactForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ContactController {

    @RequestMapping(value = "/contact", method = RequestMethod.GET)
    public String showContactForm() {
        return "contact"; // Return the name of the HTML/Thymeleaf template for the contact form
    }

    @PostMapping("/contact")
    public String submitContactForm(ContactForm form) {
        // Process the form data and send the email
        // You'll need to implement the logic to send the email using a library or service

        // Redirect to a success page or another appropriate page
        return "redirect:/contact-success"; // Replace with your desired success page URL
    }
}
