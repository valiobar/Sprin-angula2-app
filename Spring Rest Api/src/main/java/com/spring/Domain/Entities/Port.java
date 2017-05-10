package com.spring.Domain.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.List;

@Entity

public class Port  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public List<Reggata> getReggatas() {
        return reggatas;
    }

    public void setReggatas(List<Reggata> reggatas) {
        this.reggatas = reggatas;
    }

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    private Point point;

    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "port")
    private List<User> users;
    @JsonIgnore
    @OneToMany(mappedBy = "port")
    private List<Reggata>reggatas;


    public List<User> getUsers() {
        return users;
    }



    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Port() {
    }

    public Port(Point point, String name) {
        this.point = point;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
