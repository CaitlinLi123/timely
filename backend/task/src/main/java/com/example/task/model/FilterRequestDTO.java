package com.example.task.model;

import java.util.List;

public record FilterRequestDTO(
        List<Priority> priority,
        List<Status> status,
        List<Due> due,
        List<Integer> labels,
        String username) {
}
