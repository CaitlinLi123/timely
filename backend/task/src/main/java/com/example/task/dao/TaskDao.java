package com.example.task.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.task.model.Due;
import com.example.task.model.Priority;
import com.example.task.model.Status;
import com.example.task.model.Todo;

@Repository
public interface TaskDao extends JpaRepository<Todo, Integer>, JpaSpecificationExecutor<Todo> {

    @Query(value = "SELECT * FROM task t WHERE t.id>:start LIMIT :limit", nativeQuery = true)
    List<Todo> findByPage(int start, int limit);

    List<Todo> findByUsername(String username);
}