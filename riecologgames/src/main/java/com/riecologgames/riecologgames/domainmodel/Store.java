package com.riecologgames.riecologgames.domainmodel;




import jakarta.persistence.Entity;

import jakarta.persistence.Table;
import jakarta.persistence.Id;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "stores", schema = "riecologgames" )
public class Store {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String address;


 



    public Store(Long id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
    public Store() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

  

    

    


}
