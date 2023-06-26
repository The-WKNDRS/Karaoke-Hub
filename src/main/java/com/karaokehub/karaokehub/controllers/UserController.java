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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.regex.Pattern;

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
        if (model.getAttribute("user") == null) {
            model.addAttribute("user", new User());
        }
        return "register";
    }

    @PostMapping("/register")
    public String registerUsers(@ModelAttribute User user, @RequestParam(name = "confirmPassword") String confirmPassword, RedirectAttributes redir) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\." +
                "[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                "A-Z]{2,7}$";
        Pattern pat = Pattern.compile(emailRegex);
        User newUser = new User();

        if (userDao.findByUsername(user.getUsername()) != null) {
            redir.addFlashAttribute("message", "Username Is Taken");
            return "redirect:/register?username";
        } else if (user.getUsername() == null || user.getUsername().isEmpty()) {
            redir.addFlashAttribute("message", "Username Is Required");
            return "redirect:/register?username1";
        } else {
            newUser.setUsername(user.getUsername());
        }

        if (pat.matcher(user.getEmail()).matches()) {
            newUser.setEmail(user.getEmail());
        } else {
            redir.addFlashAttribute("user", user);
            redir.addFlashAttribute("message", "Invalid Email");
            return "redirect:/register?email";
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            if (user.getPassword().equals(confirmPassword)) {
                String password = passwordEncoder.encode(user.getPassword());
                newUser.setPassword(password);
            } else {
                redir.addFlashAttribute("user", user);
                redir.addFlashAttribute("message", "Passwords Do Not Match");
                return "redirect:/register?password1";
            }
        } else {
            redir.addFlashAttribute("user", user);
            redir.addFlashAttribute("message", "Password Is Required");
            return "redirect:/register?password";
        }

        userDao.save(newUser);
        redir.addFlashAttribute("message", "Registration Successful");
        return "redirect:/login?success";
    }

    @GetMapping("/login")
    public String loginUsers(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @GetMapping("/login?logout")
    public String logoutUsers(RedirectAttributes redir) {
        redir.addFlashAttribute("message", "You have been logged out");
        return "redirect:/login";
    }

    @PostMapping("/login")
    public String loginUsers(@ModelAttribute User user, RedirectAttributes redirect) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            redirect.addFlashAttribute("message", "Username Is Required");
            return "redirect:/login?username";
        } else if (user.getPassword() == null || user.getPassword().isEmpty()) {
            redirect.addFlashAttribute("message", "Password Is Required");
            return "redirect:/login?password";
        } else if (userDao.findByUsername(user.getUsername()) != null && passwordEncoder.matches(user.getPassword(), userDao.findByUsername(user.getUsername()).getPassword())) {
            return "redirect:/index";
        } else {
            redirect.addFlashAttribute("message", "Invalid Credentials");
            return "redirect:/login?invalid";
        }
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

    @GetMapping("/about")
    public String about() {
        return "about";
    }


}
