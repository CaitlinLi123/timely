package com.example.task.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.task.model.FilterRequestDTO;
import com.example.task.model.Label;
import com.example.task.model.Priority;
import com.example.task.model.Status;
import com.example.task.model.Todo;
import com.example.task.model.TodoRequestDTO;
import com.example.task.service.TaskService;

import java.util.Date;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/todos")
    public ResponseEntity<Todo> postToDos(@RequestBody TodoRequestDTO task) {
        return taskService.createToDos(task);
    }

    @GetMapping("/todos/all")
    public ResponseEntity<List<Todo>> getAllToDos() {
        return taskService.getAllToDos();
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<Todo> getATodoById(@PathVariable int id) {
        return taskService.getAToDoById(id);
    }

    @GetMapping("/todos/all/{username}")
    public ResponseEntity<List<Todo>> getTodosByUserName(@PathVariable String username) {
        return taskService.getToDoByUsername(username);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getTodos(@RequestParam int page, @RequestParam int limit) {
        return taskService.getTodos(page, limit);
    }

    @PostMapping("/todos/filter")
    public ResponseEntity<List<Todo>> getByFilter(@RequestBody FilterRequestDTO filter) {
        return taskService.getByFilter(filter);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Todo> updateATodo(@PathVariable int id, @RequestBody Todo task) {
        return taskService.updateATodo(id, task);
    }

    @PatchMapping("/todo/{id}/description")
    public ResponseEntity<Todo> updateDescription(@PathVariable int id, @RequestParam String description) {
        return taskService.updateTodoDesc(id, description);
    }

    @PatchMapping("/todo/{id}/label")
    public ResponseEntity<Todo> updateLabels(@PathVariable int id, @RequestBody List<Label> labels) {
        return taskService.updateLabels(id, labels);
    }

    @PatchMapping("/todo/{id}/date")
    public ResponseEntity<Todo> updateDate(@PathVariable int id, @RequestBody Date date) {
        return taskService.updateDate(id, date);
    }

    @PatchMapping("/todo/{id}/priority")
    public ResponseEntity<Todo> updatePriority(@PathVariable int id, @RequestBody Priority priority) {
        return taskService.updatePriority(id, priority);
    }

    @PatchMapping("/todo/{id}/status")
    public ResponseEntity<Todo> updateStatus(@PathVariable int id, @RequestBody Status status) {
        return taskService.updateStatus(id, status);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<String> deleteATodo(@PathVariable int id) {
        return taskService.deleteATodo(id);
    }
}
