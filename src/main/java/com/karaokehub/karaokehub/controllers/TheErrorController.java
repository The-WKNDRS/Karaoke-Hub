package com.karaokehub.karaokehub.controllers;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class TheErrorController implements ErrorController {

        @RequestMapping("/error")
        public String handleError(HttpServletRequest request) {
            Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
            System.out.println(status);
            if (status != null) {
                int statusCode = Integer.parseInt(status.toString());



                if (statusCode == HttpStatus.NOT_FOUND.value()) {
                    // handle HTTP 404 Not Found error
                    return "4xx";
                }
            }
            return "error/error";
        }
}





//@Controller
//public class TheErrorController implements ErrorController {
//
//    @RequestMapping("/error")
//    public String handleError(HttpServletRequest request) {
////        String errorPage = "";
//
//        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
//        System.out.println(status);
//        if (status != null) {
//            int statusCode = Integer.parseInt(status.toString());
//
//            if (statusCode == HttpStatus.NOT_FOUND.value()) {
//                // handle HTTP 404 Not Found error
//                return "error/404";
//
//            } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
//                // handle HTTP 403 Forbidden error
//                System.out.println(HttpStatus.FORBIDDEN.value());
//                return "error/403";
//
//            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
//                // handle HTTP 500 Internal Server error
//                return "error/500";
//            }
//        }
//        return "error/error";
//    }

//    public String getErrorPath() {
//        return "/error";
//    }
//
//}

//@Controller
//public class TheErrorController implements ErrorController {
//    private final ErrorAttributes errorAttributes;
//
//    public CustomErrorController(ErrorAttributes errorAttributes) {
//        this.errorAttributes = errorAttributes;
//    }
//
//    @GetMapping
//    public String handleError(HttpServletRequest request) {
//        Error error = errorAttributes.getError(new ServletWebRequest(request));
//        String errorPage = "error"; // default
//
//        if (error != null) {
//            int statusCode = error.getStatusCode();
//
//            if (statusCode == HttpStatus.NOT_FOUND.value()) {
//                // handle HTTP 404 Not Found error
//                errorPage = "error/404";
//            } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
//                // handle HTTP 403 Forbidden error
//                errorPage = "error/403";
//            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
//                // handle HTTP 500 Internal Server error
//                errorPage = "error/500";
//            }
//        }
//
//        return errorPage;
//    }

//    @Override
//    public String getErrorPath() {
//        return "/error";
//    }
//}