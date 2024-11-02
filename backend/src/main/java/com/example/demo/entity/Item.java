package com.example.demo.entity;

import jakarta.persistence.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @Column(nullable = false)
    private Long count;



    public Item(Long id, Long count, boolean completed, String description) {
        this.id = id;
        this.count = count;
        this.description = description;
    }


    public Item() {}

    public Long getCount() {
        return count;
    }


    public void setCount(Long count) {
        this.count = count < 0 ? 0 : count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", count=" + count +
                '}';
    }
}
