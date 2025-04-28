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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/todos")
// @CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // get all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllToDos(@RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit) {
        if (page != null && limit != null) {
            return taskService.getTodos(page, limit); // paginated
        } else {
            return taskService.getAllToDos(); // all todos
        }
    }

    // get a todo by id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getATodoById(@PathVariable int id) {
        return taskService.getAToDoById(id);
    }

    // get todos by username
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Todo>> getTodosByUserName(@PathVariable String username) {
        return taskService.getToDoByUsername(username);
    }

    // create a todo
    @PostMapping
    public ResponseEntity<Todo> createATodo(@RequestBody TodoRequestDTO task) {
        return taskService.createToDos(task);
    }

    // filter todos
    @PostMapping("/filter")
    public ResponseEntity<List<Todo>> getByFilter(@RequestBody FilterRequestDTO filter) {
        return taskService.getByFilter(filter);
    }

    // update a full todo by id
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateATodo(@PathVariable int id, @RequestBody Todo task) {
        return taskService.updateATodo(id, task);
    }

    /* PARTIAL UPDATES */

    // update desc
    @PatchMapping("/{id}/description")
    public ResponseEntity<Todo> updateDescription(@PathVariable int id, @RequestParam String description) {
        return taskService.updateTodoDesc(id, description);
    }

    // update label
    @PatchMapping("/{id}/label")
    public ResponseEntity<Todo> updateLabels(@PathVariable int id, @RequestBody List<Label> labels) {
        return taskService.updateLabels(id, labels);
    }

    // update date
    @PatchMapping("/{id}/date")
    public ResponseEntity<Todo> updateDate(@PathVariable int id, @RequestBody Date date) {
        return taskService.updateDate(id, date);
    }

    // update priority
    @PatchMapping("/{id}/priority")
    public ResponseEntity<Todo> updatePriority(@PathVariable int id, @RequestBody Priority priority) {
        return taskService.updatePriority(id, priority);
    }

    // update status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Todo> updateStatus(@PathVariable int id, @RequestBody Status status) {
        return taskService.updateStatus(id, status);
    }

    // delete a todo
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteATodo(@PathVariable int id) {
        return taskService.deleteATodo(id);
    }
}
