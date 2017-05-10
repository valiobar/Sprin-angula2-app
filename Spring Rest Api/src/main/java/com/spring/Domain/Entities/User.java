package com.spring.Domain.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Proxy;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.*;
import java.util.*;
@Proxy(lazy = false)
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty
    @Column(name = "username")
    private String username;
    @JsonProperty
    @Column(name = "password")
    private String password;
    @JsonProperty
    @Column(name = "email", unique = true)
    private String email;

    /*@ManyToMany(mappedBy = "participents")
    private List<Reggata> reggataPart;*/

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_AUTHORITY",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID")})
    private List<Role> authorities;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }
    @JsonIgnore
    @Column(name = "LASTPASSWORDRESETDATE")
    private Date lastPasswordResetDate;

  /*  public List<Reggata> getReggataPart() {
        return reggataPart;
    }

    public void setReggataPart(List<Reggata> reggataPart) {
        this.reggataPart = reggataPart;
    }
*/
    public List<Reggata> getReggatas() {
        return reggatas;
    }

    public void setReggatas(List<Reggata> reggatas) {
        this.reggatas = reggatas;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "userId")
    private List<Reggata> reggatas;


    public User() {
        this.isAccountNonExpired=true;
        this.isAccountNonLocked =true;
        this.isCredentialsNonExpired=true;
        this.isEnabled=true;
        this.lastPasswordResetDate=new Date();
       this.setAuthorities(new ArrayList<>());



    }

    public User(String username, String password, String email) {

        this.setPassword(password);
        this.setUsername(username);
        this.isAccountNonExpired=true;
        this.isAccountNonLocked =true;
        this.isCredentialsNonExpired=true;
        this.isEnabled=true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    @Override
    public List<Role> getAuthorities() {
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email =email;
    }
    public  void setUsername(String username){
        {
            this.username = username;
        }
    }

    public void setAuthorities(List<Role> authorities) {
        this.authorities = authorities;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }
}
