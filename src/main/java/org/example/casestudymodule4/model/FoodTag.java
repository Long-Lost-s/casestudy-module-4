package org.example.casestudymodule4.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "food_tags")
public class FoodTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;
}
