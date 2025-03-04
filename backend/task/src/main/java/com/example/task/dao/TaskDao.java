package com.example.task.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.task.model.Task;

@Repository
public interface TaskDao extends JpaRepository<Task, Integer> {

    @Query(value = "SELECT * FROM task t WHERE t.id>:start LIMIT :limit", nativeQuery = true)
    List<Task> findByPage(int start, int limit);

}