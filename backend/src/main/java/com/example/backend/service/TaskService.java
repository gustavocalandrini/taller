package com.example.backend.service;

import com.example.backend.domain.Task;
import com.example.backend.errors.BadRequestAlertException;
import com.example.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class TaskService {

    private static final String ENTITY_NAME = "task";

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        if (!StringUtils.hasText(task.getTitle())) {
            throw new BadRequestAlertException("The field title should not be empty or null", ENTITY_NAME, "Bad Request");
        }
        return taskRepository.save(task);
    }

    public boolean deleteTask(Long id) {
        return taskRepository.delete(id);
    }

    public Task getTask(Long id) {
        return taskRepository.findById(id);
    }
}
