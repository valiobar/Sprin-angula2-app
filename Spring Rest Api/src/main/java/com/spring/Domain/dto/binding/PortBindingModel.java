package com.spring.Domain.dto.binding;

import com.spring.Domain.Entities.Point;

import javax.validation.constraints.Size;

/**
 * Created by UserX on 5/2/2017.
 */
public class PortBindingModel {

private Point point;
    @Size(min = 2, message = "Port name too short")
    private String name;

    public PortBindingModel() {
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
