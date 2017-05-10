package com.spring.Domain.dto.view;

public class LoggedUserDataModel {

    private Long id;

    private String email;

    private String username;

    private PortViewModel port;

    public PortViewModel getPort() {
        return port;
    }

    public void setPort(PortViewModel port) {
        this.port = port;
    }

    public LoggedUserDataModel() {
    }

    public LoggedUserDataModel(Long id, String email, String name) {
        this.setId(id);
        this.setEmail(email);
        this.setUsername(name);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
