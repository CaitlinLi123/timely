package com.example.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.task.dao.TaskDao;
import com.example.task.model.Todo;

@Service
public class TaskService {
    private TaskDao dao;

    @Autowired
    public TaskService(TaskDao dao) {
        this.dao = dao;
    }

    public ResponseEntity<Todo> createToDos(Todo task) {
        return new ResponseEntity<>(dao.save(task), HttpStatus.OK);
    }

    public ResponseEntity<List<Todo>> getAllToDos() {
        return new ResponseEntity<>(dao.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Todo> getAToDoById(int id) {
        Todo task = dao.findById(id).get();
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Todo(), HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<Todo> updateATodo(int id, Todo task) {
        Todo taskFound = dao.findById(id).get();
        if (taskFound != null) {
            // taskFound.setType(task.getType());
            // taskFound.setDescription(task.getDescription());
            return new ResponseEntity<>(dao.save(task), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteATodo(int id) {
        Todo taskFound = dao.findById(id).get();
        if (taskFound != null) {
            dao.delete(taskFound);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found in db", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Todo>> getTodos(int page, int limit) {
        int start = (page - 1) * limit;
        List<Todo> tasks = dao.findByPage(start, limit);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    public ResponseEntity<List<Todo>> getToDoByUsername(String username) {
        return new ResponseEntity<>(dao.findByUsername(username), HttpStatus.OK);
    }

    public ResponseEntity<Todo> updateTodoDesc(int id, String description) {
        Todo taskFound = dao.findById(id).get();
        if (taskFound != null) {
            taskFound.setDescription(description);
            return new ResponseEntity<>(dao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
