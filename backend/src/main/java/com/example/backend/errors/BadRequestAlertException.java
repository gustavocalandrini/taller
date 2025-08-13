package com.example.backend.errors;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
@Setter
public class BadRequestAlertException extends ResponseStatusException {

    private final String entityName;
    private final String errorKey;

    public BadRequestAlertException(String defaultMessage, String entityName, String errorKey) {
        super(HttpStatus.BAD_REQUEST, defaultMessage);
        this.entityName = entityName;
        this.errorKey = errorKey;
    }

}
