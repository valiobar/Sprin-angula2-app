package com.spring.Domain.dto.view;

import com.spring.Domain.Entities.Point;

/**
 * Created by UserX on 3/19/2017.
 */
public class PortViewModel {
  private long id;

    private String Name;

   private Point point;

    public PortViewModel() {
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Point getPoint() {
        return point;
    }
    public void setPoint(Point point) {
        this.point = point;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
