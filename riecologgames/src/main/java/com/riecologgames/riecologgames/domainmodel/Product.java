package com.riecologgames.riecologgames.domainmodel;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;



@Entity
@Table(name = "products", schema = "riecologgames" )
public class Product {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private boolean arrived;
    private boolean sold;

 
    public Product(Game game, Store store, User user) {
        this.game = game;
        this.store = store;
        this.user = user;
        this.arrived = false;
        this.sold = false;
    }

    public Product() {
    }


    public void setArrived(boolean arrived) {
        this.arrived = arrived;
    }


    public void setSold(boolean sold) {
        this.sold = sold;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    public void setGame(Game game) {
        this.game = game;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }


    public Game getGame() {
        return game;
    }


    public Store getStore() {
        return store;
    }


    public User getUser() {
        return user;
    }


    public boolean isArrived() {
        return arrived;
    }


    public boolean isSold() {
        return sold;
    }

    

    

    

   
    
}
