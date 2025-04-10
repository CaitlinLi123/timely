package com.example.task.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.task.model.Label;
import com.example.task.model.Todo;

@Repository
public interface LabelDao extends JpaRepository<Label, Integer> {

    List<Label> findByUsername(String username);

    @Query("SELECT l.todos FROM Label l WHERE l.id = :labelId")
    List<Todo> findTodosByLabelId(@Param("labelId") int labelId);

}