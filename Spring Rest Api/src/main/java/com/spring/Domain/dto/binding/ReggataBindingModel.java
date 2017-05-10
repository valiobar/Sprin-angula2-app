package com.spring.Domain.dto.binding;

import com.spring.Domain.Entities.Point;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.Domain.dto.view.PortViewModel;

import java.util.Date;
import java.util.List;

/**
 * Created by UserX on 3/19/2017.
 */
public class ReggataBindingModel {

    private PortViewModel port;

    private List<Point> reggataPoints;

    private String username;

    private Date reggataDate;

    public PortViewModel getPort() {
        return port;
    }

    public void setPort(PortViewModel port) {
        this.port = port;
    }

    public List<Point> getReggataPoints() {
        return reggataPoints;
    }

    public void setReggataPoints(List<Point> reggataPoints) {
        this.reggataPoints = reggataPoints;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getReggataDate() {
        return reggataDate;
    }

    public void setReggataDate(Date reggataDate) {
        this.reggataDate = reggataDate;
    }

    public ReggataBindingModel() {

    }
}
