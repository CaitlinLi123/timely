package com.example.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.task.dao.LabelDao;
import com.example.task.model.Label;

@Service
public class LabelService {
    private final LabelDao labelDao;

    @Autowired
    public LabelService(LabelDao labelDao) {
        this.labelDao = labelDao;
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

}
