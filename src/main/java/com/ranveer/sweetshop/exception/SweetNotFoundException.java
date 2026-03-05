package com.ranveer.sweetshop.exception;

public class SweetNotFoundException extends RuntimeException {

    public SweetNotFoundException(String message) {
        super(message);
    }
}