package com.example.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.task.dao.TaskDao;
import com.example.task.model.Task;

@Service
public class TaskService {
    private TaskDao dao;

    @Autowired
    public TaskService(TaskDao dao) {
        this.dao = dao;
    }

    public ResponseEntity<Task> createToDos(Task task) {
        return new ResponseEntity<>(dao.save(task), HttpStatus.OK);
    }

    public ResponseEntity<List<Task>> getAllToDos() {
        return new ResponseEntity<>(dao.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Task> getAToDoById(int id) {
        Task task = dao.findById(id).get();
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Task(), HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<Task> updateATodo(int id, Task task) {
        Task taskFound = dao.findById(id).get();
        if (taskFound != null) {
            taskFound.setType(task.getType());
            taskFound.setDescription(task.getDescription());
            return new ResponseEntity<>(dao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteATodo(int id) {
        Task taskFound = dao.findById(id).get();
        if (taskFound != null) {
            dao.delete(taskFound);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found in db", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Task>> getTodos(int page, int limit) {
        int start = (page - 1) * limit;
        List<Task> tasks = dao.findByPage(start, limit);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    public ResponseEntity<List<Task>> getToDoByUsername(String username) {
        return new ResponseEntity<>(dao.findByUsername(username), HttpStatus.OK);
    }

}
