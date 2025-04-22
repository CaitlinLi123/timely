package com.example.task.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "labels")
public class Label {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String color;// rgb code

    private String username; // created by which user

    @ManyToMany(mappedBy = "labels", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonIgnore
    private List<Todo> todos;

    @PreRemove
    private void removeLabelsFromTodos() {
        for (Todo todo : todos) {
            todo.getLabels().remove(this);
        }
    }
}
