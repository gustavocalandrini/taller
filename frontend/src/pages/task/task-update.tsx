import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  Spin,
} from 'antd';
import { TaskStatus } from '../../shared/types/enumerations/task-status-enum';
import { useAppDispatch, useAppSelector } from '../../services/config/redux/hooks';
import type { ITask } from '../../shared/types/task-model';
import { fetchTaskByIdThunk, updateTaskThunk } from './task-slice';

const { Option } = Select;

const TaskUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { currentTask, loading } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (id) dispatch(fetchTaskByIdThunk(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentTask) {
      form.setFieldsValue({
        title: currentTask.title,
        status: currentTask.status
      });
    }
  }, [currentTask, form]);

  const handleSubmit = (values: any) => {
    const payload: ITask = {
      id: Number(id),
      title: values.title,
      status: values.status,
    };

    dispatch(updateTaskThunk(payload)).then((action) => {
      if (updateTaskThunk.fulfilled.match(action)) {
        navigate('/tasks');
      }
    });
  };

  if (loading || !currentTask) return <Spin fullscreen />;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h2>Edit Task</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: false }]}>
          <Select>
            {Object.values(TaskStatus).map(status => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskUpdate;
