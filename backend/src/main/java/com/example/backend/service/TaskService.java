package com.example.backend.service;

import com.example.backend.domain.Task;
import com.example.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public boolean deleteTask(Long id) {
        return taskRepository.delete(id);
    }

    public Task getTask(Long id) {
        return taskRepository.findById(id);
    }
}
