package org.example.casestudymodule4.repository;

import java.util.Optional;

import org.example.casestudymodule4.model.RoleType;
import org.example.casestudymodule4.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}
