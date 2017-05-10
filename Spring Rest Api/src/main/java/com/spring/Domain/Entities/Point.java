package com.spring.Domain.Entities;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Table(name = "Points")
public  class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float lat;

    @ManyToOne(targetEntity = Reggata.class)
    @JoinColumn(name = "reggata_id")
    private Reggata reggata;

    private float lng;

    public  Point() {

    }

    public Point(float latitude, float longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public Reggata getReggata() {
        return reggata;
    }

    public void setReggata(Reggata reggata) {
        this.reggata = reggata;
    }

    public float getLng() {
        return lng;
    }

    public void setLng(float lng) {
        this.lng = lng;
    }
}
