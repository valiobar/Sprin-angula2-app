package com.spring.Domain.Entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Reggata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany( cascade = CascadeType.ALL,mappedBy = "reggata")
     private List<Point> reggataPoints;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    @ManyToMany
    @JoinTable(name = "users_reggatas", joinColumns = @JoinColumn(name = "reggata_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    List<User>participents ;

    private Date created;
    private Date reggataDate;

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Reggata() {
        this.created = new Date();
    }

    public Long getId() {
        return id;
    }

    public User getUser_id() {
        return userId;
    }

    public void setUser_id(User user_id) {
        this.userId = user_id;
    }

    public List<User> getParticipents() {
        return participents;
    }

    public void setParticipents(List<User> participents) {
        this.participents = participents;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getReggataDate() {
        return reggataDate;
    }

    public void setReggataDate(Date reggataDate) {
        this.reggataDate = reggataDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Point> getReggataPoints() {
        return reggataPoints;
    }

    public void setReggataPoints(List<Point> reggataPoints) {
        this.reggataPoints = reggataPoints;
    }
}
