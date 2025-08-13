import { TaskStatus } from './enumerations/task-status-enum';

export interface ITask {
  id?: number;
  title: string;
  status: TaskStatus;
}