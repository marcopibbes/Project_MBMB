package com.riecologgames.riecologgames.domainmodel;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
@Table(name = "games", schema = "riecologgames" )
public class Game {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;
    private String platform;
    private BigDecimal price;


    public Game() {
    }

    public Game(String title, String genre, String platform, BigDecimal price) {
        this.title = title;
        this.genre = genre;
        this.platform = platform;
        this.price = price;
    }   


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public String getPlatform() {
        return platform;
    }
    
    public BigDecimal getPrice() {
        return price;
    }

    public void setTitle(String title) {
        this.title = title;
    }   

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    

   
    
}
