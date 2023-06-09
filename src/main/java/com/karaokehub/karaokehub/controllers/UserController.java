package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.User;
import com.karaokehub.karaokehub.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private final UserRepository userDao;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userDao, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
    }

    @GetMapping("/register")
    public String registerUsers(Model model) {
        model.addAttribute("user", new User());
        return "/register";
    }

    @PostMapping("/register")
    public String registerUsers(@ModelAttribute User user, @RequestParam(name = "confirmPassword") String confirmPassword) {
        System.out.println(user.getUsername());
        if (user.getPassword().equals(confirmPassword)) {
            user.setPassword(passwordEncoder.encode(confirmPassword));
            userDao.save(user);
        }
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginUsers(Model model) {
        model.addAttribute("user", new User());
        return "/login";
    }

    @GetMapping("/profile")
    public String showProfile(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        user = userDao.getReferenceById(id);
        model.addAttribute("user", user);
        return "/user-profile";
    }

    @PostMapping("/profile/edit")
    public String editProfile(@RequestParam(name="username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password, @RequestParam(name = "confirmPassword") String confirmPassword) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        user = userDao.getReferenceById(id);
        user.setUsername(username);
        user.setEmail(email);
        if (password.equals(confirmPassword)) {
            password = passwordEncoder.encode(password);
            user.setPassword(password);
            userDao.save(user);
        }
        return "redirect:/profile";
    }


}
