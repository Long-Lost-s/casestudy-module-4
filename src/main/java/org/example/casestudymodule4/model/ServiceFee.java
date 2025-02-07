package org.example.casestudymodule4.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ServiceFee")
public class ServiceFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private double serviceFee;

    @Column(nullable = false)
    private String serviceFeeDescription;
}
