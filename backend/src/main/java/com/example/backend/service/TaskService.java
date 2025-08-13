package com.example.backend.service;

import com.example.backend.domain.Task;
import com.example.backend.errors.BadRequestAlertException;
import com.example.backend.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TaskService {

    private static final String ENTITY_NAME = "task";

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Page<Task> getAllTasks(Pageable pageable) {
        List<Task> tasks = taskRepository.findAll();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), tasks.size());

        List<Task> content = start >= tasks.size() ? List.of() : tasks.subList(start, end);

        return new PageImpl<>(content, pageable, tasks.size());
    }

    public Task createTask(Task task) {
        if (!StringUtils.hasText(task.getTitle())) {
            throw new BadRequestAlertException("The field title should not be empty or null", ENTITY_NAME, "Bad Request");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {

        if(task.getId() == null){
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "ID should not be null");
        }

        if(!Objects.equals(id, task.getId())){
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "Provided ids doesn't match");
        }

        return taskRepository.update(id, task);
    }

    public boolean deleteTask(Long id) {
        return taskRepository.delete(id);
    }

    public Task getTask(Long id) {
        return taskRepository.findById(id);
    }
}
