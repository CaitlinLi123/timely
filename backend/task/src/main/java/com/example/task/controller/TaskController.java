package com.example.task.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.task.model.Task;
import com.example.task.service.TaskService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/todo")
    public ResponseEntity<Task> postToDos(@RequestBody Task task) {
        return taskService.createToDos(task);
    }

    @GetMapping("/todos/all")
    public ResponseEntity<List<Task>> getAllToDos() {
        return taskService.getAllToDos();
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<Task> getATodoById(@PathVariable int id) {
        return taskService.getAToDoById(id);
    }

    @GetMapping("/todos/all/{username}")
    public ResponseEntity<List<Task>> getTodosByUserName(@PathVariable String username) {
        return taskService.getToDoByUsername(username);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Task>> getTodos(@RequestParam int page, @RequestParam int limit) {
        return taskService.getTodos(page, limit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateATodo(@PathVariable int id, @RequestBody Task task) {
        return taskService.updateATodo(id, task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteATodo(@PathVariable int id) {
        return taskService.deleteATodo(id);
    }
}
