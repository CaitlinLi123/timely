package com.example.task.service;

import org.springframework.data.jpa.domain.Specification;

import com.example.task.model.Due;
import com.example.task.model.FilterRequestDTO;
import com.example.task.model.Todo;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TaskSpecs {
    public static Specification<Todo> filterTodos(FilterRequestDTO filter) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // priority
            if (filter.priority() != null && !filter.priority().isEmpty()) {
                predicates.add(root.get("priority").in(filter.priority()));
            }

            // status
            if (filter.status() != null && !filter.status().isEmpty()) {
                predicates.add(root.get("status").in(filter.status()));
            }

            // labels
            if (filter.labels() != null && !filter.labels().isEmpty()) {
                predicates.add(root.join("labels").get("id").in(filter.labels()));
            }

            // username
            if (filter.username() != null) {
                predicates.add(builder.equal(root.get("username"), filter.username()));
            }

            // date
            if (filter.due() != null && !filter.due().isEmpty()) {
                Date now = new Date();
                for (Due due : filter.due()) {
                    switch (due) {
                        case Overdue -> predicates.add(builder.lessThan(root.get("date"), now));
                        case DueInNextDay -> predicates
                                .add(builder.between(root.get("date"), now, addDays(now, 1, Calendar.DAY_OF_YEAR)));
                        case DueInNextWeek -> predicates
                                .add(builder.between(root.get("date"), now, addDays(now, 7, Calendar.DAY_OF_YEAR)));
                        case DueInNextMonth -> predicates
                                .add(builder.between(root.get("date"), now, addDays(now, 1, Calendar.DAY_OF_MONTH)));
                    }
                }
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static Date addDays(Date date, int days, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(field, days);
        return calendar.getTime();
    }

}
