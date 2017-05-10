package com.spring.Domain.dto.view;

import com.spring.Domain.Entities.Point;
import com.spring.Domain.Entities.Port;
import com.spring.Domain.Entities.User;

import java.util.Date;
import java.util.List;

/**
 * Created by UserX on 3/18/2017.
 */
public class ReggataViewModel {
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private PortViewModel port;

    public PortViewModel getPort() {
        return port;
    }

    public void setPort(PortViewModel port) {
        this.port = port;
    }

    private List<ReggataPointViewModel> reggataPoints;

    public List<ReggataPointViewModel> getReggataPoints() {
        return reggataPoints;
    }

    public void setReggataPoints(List<ReggataPointViewModel> reggataPoints) {
        this.reggataPoints = reggataPoints;
    }

    private String username;

    public ReggataViewModel() {
    }

    List<User>participents ;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    private Date created;
    private Date reggataDate;
}
