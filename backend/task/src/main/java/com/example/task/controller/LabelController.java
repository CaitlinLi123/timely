package com.example.task.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.task.model.Label;
// import com.example.task.model.Todo;
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
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/labels")
public class LabelController {

    private final LabelService labelService;

    @Autowired
    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    // get all labels by username
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Label>> getLabelsByUserName(@PathVariable String username) {
        return labelService.getLabelsByUsername(username);
    }

    // create a label
    @PostMapping
    public ResponseEntity<Label> createALabel(@RequestBody Label label) {
        return labelService.createALabel(label);
    }

    // update a label by id
    @PutMapping("/{id}")
    public ResponseEntity<Label> updateALabel(@PathVariable int id, @RequestBody Label label) {
        return labelService.updateALabel(id, label);
    }

    // delete a label by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteALabel(@PathVariable int id) {
        return labelService.deleteLabelById(id);
    }

}
