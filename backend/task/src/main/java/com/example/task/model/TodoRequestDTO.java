package com.example.task.model;

import java.util.Date;
import java.util.List;

public record TodoRequestDTO(
        String description,
        String priority,
        String status,
        Date date,
        String username,
        List<Integer> labels) {
}
