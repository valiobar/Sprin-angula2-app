package com.spring.Domain.dto.binding;

import javax.validation.constraints.Size;

public class LoginAttemptModel {
    @Size(min = 15, message = "Username too short")
    private String username;
    @Size(min = 15, message = "Username too short")
    private String password;


    public LoginAttemptModel() {
    }

    public LoginAttemptModel(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
