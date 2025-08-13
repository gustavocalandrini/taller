import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button } from 'antd';
import { TaskStatus } from '../../shared/types/enumerations/task-status-enum';
import type { ITask } from '../../shared/types/task-model';
import { useAppDispatch } from '../../services/config/redux/hooks';
import { createTaskThunk } from './task-slice';

const { Option } = Select;

const TaskCreate: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: any) => {
        const payload: ITask = {
            title: values.title,
            status: values.status
        };

        dispatch(createTaskThunk(payload)).then((action) => {
            if (createTaskThunk.fulfilled.match(action)) {
                navigate('/tasks');
            }
        });
    };

    return (
        <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
            <h2>Create Task</h2>
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
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TaskCreate;
