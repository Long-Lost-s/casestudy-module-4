package org.example.casestudymodule4.service;

import org.example.casestudymodule4.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenericServiceImpl<T, ID> implements IGenericService<T, ID> {

    @Autowired
    private JpaRepository<T, ID> repository;

    @Override
    public List<T> getAll() {
        return repository.findAll();
    }

    @Override
    public T getById(ID id) {
        Optional<T> entity = repository.findById(id);
        return entity.orElseThrow(() -> new ResourceNotFoundException("Entity not found for this id :: " + id));
    }

    @Override
    public T create(T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(ID id, T entityDetails) {
        T entity = getById(id);
        // Implement logic to update the entity
        return repository.save(entity);
    }

    @Override
    public void delete(ID id) {
        T entity = getById(id);
        repository.delete(entity);
    }
}