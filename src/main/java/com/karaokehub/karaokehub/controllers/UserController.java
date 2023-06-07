package com.karaokehub.karaokehub.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/register")
    public String registerUser() {
        return "/register";
    }

    @GetMapping("/login")
    public String userLogin() {
        return "/login";
    }


}
