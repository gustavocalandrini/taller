import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { ITask } from '../../shared/types/task-model';
import api from '../../services/config/axios/api';

interface TaskState {
    currentTask: ITask | null;
    tasks: ITask[];
    total: number;
    current: number;
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    currentTask: null,
    tasks: [],
    total: 0,
    current: 1,
    loading: false,
    error: null,
};

export const fetchTasksThunk = createAsyncThunk(
    'task/fetchTasks',
    async (
        { page, pageSize }: { page: number; pageSize: number },
        thunkAPI
    ) => {
        try {
            const res = await api.get<{ data: ITask[]; total: number; current: number }>(
                `/tasks?page=${page}&pageSize=${pageSize}`
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as any)?.response?.data?.message || (error as any)?.message || 'Failed to fetch tasks'
            );
        }
    }
);

export const fetchTaskByIdThunk = createAsyncThunk(
    'task/fetchById',
    async (id: number, thunkAPI) => {
        try {
            const res = await api.get<ITask>(`/tasks/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as any)?.response?.data?.message || (error as any)?.message || 'Failed to fetch task'
            );
        }
    }
);

export const updateTaskThunk = createAsyncThunk(
    'task/update',
    async (taskData: ITask, thunkAPI) => {
        try {
            const res = await api.put<ITask>(`/tasks/${taskData.id}`, taskData, {
                headers: {
                    'X-Success-Message': 'Task updated successfully',
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as any)?.response?.data?.message || (error as any)?.message || 'Failed to update task'
            );
        }
    }
);

export const createTaskThunk = createAsyncThunk(
    'task/create',
    async (taskData: ITask, thunkAPI) => {
        try {
            const res = await api.post<ITask>(`/tasks`, taskData, {
                headers: {
                    'X-Success-Message': 'Task created successfully',
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as any)?.response?.data?.message || (error as any)?.message || 'Failed to create task'
            );
        }
    }
);

export const deleteTaskThunk = createAsyncThunk(
    'task/deleteTask',
    async (taskId: number, thunkAPI) => {
        try {
            await api.delete(`/tasks/${taskId}`, {
                headers: {
                    'X-Success-Message': 'Task deleted successfully',
                },
            });
            return taskId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as any)?.response?.data?.message || (error as any)?.message || 'Failed to delete task'
            );
        }
    }
);


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearCurrentTask(state) {
            state.currentTask = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch paginated list
            .addCase(fetchTasksThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.tasks = action.payload.data;
                state.total = action.payload.total;
                state.current = action.payload.current;
                state.loading = false;
            })
            .addCase(fetchTasksThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any)?.message || 'Error loading tasks';
            })
            .addCase(fetchTaskByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentTask = null;
            })
            .addCase(fetchTaskByIdThunk.fulfilled, (state, action: PayloadAction<ITask>) => {
                state.currentTask = action.payload;
                state.loading = false;
            })
            .addCase(fetchTaskByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any)?.message || 'Error loading task';
            })
            .addCase(updateTaskThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTaskThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any)?.message || 'Failed to update task';
            })

            // Create task
            .addCase(createTaskThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTaskThunk.fulfilled, (state, action: PayloadAction<ITask>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any)?.message || 'Failed to create task';
            })

            // Delete task
            .addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export default taskSlice.reducer;