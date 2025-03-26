package com.example.task.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task.model.Label;

@Repository
public interface LabelDao extends JpaRepository<Label, Integer> {

    List<Label> findByUsername(String username);

}