package com.example.backend.repository;

import com.example.backend.domain.Task;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TaskRepository {
    private final List<Task> tasks = new CopyOnWriteArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Task> findAll() {
        return tasks;
    }

    public Task save(Task task) {
        if (task.getId() == null) {
            task.setId(idGenerator.getAndIncrement());
        }
        tasks.add(task);
        return task;
    }

    public boolean delete(Long id) {
        return tasks.removeIf(task -> task.getId().equals(id));
    }

    public Task findById(Long id) {
        return tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Task update(Long id, Task updatedUser) {
        for (int i = 0; i < tasks.size(); i++) {
            Task current = tasks.get(i);
            if (current.getId().equals(id)) {
                updatedUser.setId(id);
                tasks.set(i, updatedUser);
                return updatedUser;
            }
        }
        return null;
    }
}
