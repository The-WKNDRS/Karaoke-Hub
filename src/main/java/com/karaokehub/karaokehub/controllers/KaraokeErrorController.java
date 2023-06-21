package com.karaokehub.karaokehub.controllers;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class KaraokeErrorController implements ErrorController {
    @RequestMapping("/error")
    public String handleError(@NotNull HttpServletRequest request){
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if(status != null){
            System.out.println(status.toString() + " status");
            Integer statusCode = Integer.valueOf(status.toString());
            if(statusCode == 404){
                return "error/error";
            }
            else if(statusCode == 500){
                return "error/error";
            }
        }
        return "error/error";
    }
}
