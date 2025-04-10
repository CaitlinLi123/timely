package com.example.task.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.task.dao.LabelDao;
import com.example.task.model.Label;
import com.example.task.model.Todo;

@Service
public class LabelService {
    private final LabelDao labelDao;
    private final TaskService taskService;

    @Autowired
    public LabelService(LabelDao labelDao, TaskService taskService) {
        this.labelDao = labelDao;
        this.taskService = taskService;
    }

    public ResponseEntity<Label> createALabel(Label label) {
        try {
            return new ResponseEntity<>(labelDao.save(label), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Label>> getLabelsByUsername(String username) {
        try {
            List<Label> labels = labelDao.findByUsername(username);
            return new ResponseEntity<>(labels, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteLabelById(int id) {
        Label label = labelDao.findById(id).get();

        if (label != null) {
            // List<Todo> todosInUse = labelDao.findTodosByLabelId(id);
            // for (int i = 0; i < todosInUse.size(); i++) {
            // Todo todo = todosInUse.get(i);
            // todo.getLabels().stream().filter(l -> l.getId() != l.getId())
            // .toList();
            // taskService.updateATodo(todo.getId(), todo);
            // }
            labelDao.delete(label);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found in db", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Label> updateALabel(int id, Label label) {
        Label labelFound = labelDao.findById(id).get();
        if (labelFound != null) {
            labelFound.setColor(label.getColor());
            labelFound.setName(label.getName());
            return new ResponseEntity<>(labelDao.save(labelFound), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
