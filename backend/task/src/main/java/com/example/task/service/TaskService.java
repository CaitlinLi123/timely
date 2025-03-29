package com.example.task.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.task.dao.LabelDao;
import com.example.task.dao.TaskDao;

import com.example.task.model.Label;
import com.example.task.model.Priority;
import com.example.task.model.Status;
import com.example.task.model.Todo;
import com.example.task.model.TodoRequestDTO;

@Service
public class TaskService {
    @Autowired
    private TaskDao taskDao;
    @Autowired
    private LabelDao labelDao;

    // @Autowired
    // public TaskService(TaskDao dao, LabelDao labelDao) {
    // this.taskDao = taskDao;
    // this.labelDao = labelDao;
    // }

    public Label createLabelFromId(int label_id) {
        return labelDao.findById(label_id).orElseThrow(() -> new RuntimeException("Label not found"));
    }

    public ResponseEntity<Todo> createToDos(TodoRequestDTO todoDTO) {
        Todo todo = new Todo();
        todo.setDescription(todoDTO.description());
        todo.setPriority(Priority.valueOf(todoDTO.priority()));
        todo.setStatus(Status.valueOf(todoDTO.status()));
        todo.setDate(todoDTO.date());
        todo.setUsername(todoDTO.username());

        List<Label> labels = todoDTO.labels().stream().map(label_id -> createLabelFromId(label_id))
                .toList();

        todo.setLabels(labels);
        Todo savedTodo = taskDao.save(todo);

        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    public ResponseEntity<List<Todo>> getAllToDos() {
        return new ResponseEntity<>(taskDao.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Todo> getAToDoById(int id) {
        Todo task = taskDao.findById(id).get();
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Todo(), HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<Todo> updateATodo(int id, Todo task) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            // taskFound.setType(task.getType());
            // taskFound.setDescription(task.getDescription());
            return new ResponseEntity<>(taskDao.save(task), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteATodo(int id) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskDao.delete(taskFound);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found in db", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Todo>> getTodos(int page, int limit) {
        int start = (page - 1) * limit;
        List<Todo> tasks = taskDao.findByPage(start, limit);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    public ResponseEntity<List<Todo>> getToDoByUsername(String username) {
        return new ResponseEntity<>(taskDao.findByUsername(username), HttpStatus.OK);
    }

    public ResponseEntity<Todo> updateTodoDesc(int id, String description) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskFound.setDescription(description);
            return new ResponseEntity<>(taskDao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Todo> updateLabels(int id, List<Label> labels) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskFound.setLabels(labels);
            return new ResponseEntity<>(taskDao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Todo> updateDate(int id, Date date) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskFound.setDate(date);
            return new ResponseEntity<>(taskDao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Todo> updatePriority(int id, Priority priority) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskFound.setPriority(priority);
            return new ResponseEntity<>(taskDao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Todo> updateStatus(int id, Status status) {
        Todo taskFound = taskDao.findById(id).get();
        if (taskFound != null) {
            taskFound.setStatus(status);
            return new ResponseEntity<>(taskDao.save(taskFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
