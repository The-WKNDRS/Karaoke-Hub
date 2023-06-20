package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.models.User;
import com.karaokehub.karaokehub.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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
        return "register";
    }

    @PostMapping("/register")
    public String registerUsers(@ModelAttribute User user, @RequestParam(name = "confirmPassword") String confirmPassword) {
        if (user.getPassword().equals(confirmPassword)) {
            user.setPassword(passwordEncoder.encode(confirmPassword));
            userDao.save(user);
        }
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginUsers(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/profile")
    public String showProfile(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        user = userDao.getReferenceById(id);
        model.addAttribute("user", user);
        return "user-profile";
    }

    @PostMapping("/profile/update")
    public String editProfile(@ModelAttribute User user, @RequestParam(name = "confirmPassword") String confirmPassword) {
        User updateUser = userDao.getReferenceById(user.getId());
        updateUser.setUsername(user.getUsername());
        updateUser.setEmail(user.getEmail());
        String newPassword = user.getPassword();
        if (newPassword.equals(confirmPassword)) {
            newPassword= passwordEncoder.encode(newPassword);
            user.setPassword(newPassword);
            userDao.save(user);
        }
        return "redirect:/profile";
    }

    @GetMapping("/logout")
    public String customLogout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null){
            new SecurityContextLogoutHandler().logout(request, response, authentication); // <= This is the call you are looking for.
        }
        return "/logout";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }


}
