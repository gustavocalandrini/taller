package com.example.backend.errors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(BadRequestAlertException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequestAlertException(BadRequestAlertException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getReason());
        body.put("entity", ex.getEntityName());
        body.put("errorKey", ex.getErrorKey());
        return ResponseEntity.badRequest().body(body);
    }
}

