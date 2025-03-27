package com.example.task.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.task.model.Label;
import com.example.task.model.Todo;
import com.example.task.service.LabelService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/label")
public class LabelController {

    private final LabelService labelService;

    @Autowired
    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<List<Label>> getLabelsByUserName(@PathVariable String username) {
        return labelService.getLabelsByUsername(username);
    }

    @PostMapping("/create")
    public ResponseEntity<Label> createALabel(@RequestBody Label label) {
        return labelService.createALabel(label);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteALabel(@PathVariable int id) {
        return labelService.deleteLabelById(id);
    }

}
