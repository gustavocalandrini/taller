import React, { useEffect } from 'react';
import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Tag,
  Pagination,
  Popconfirm,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  fetchTasksThunk,
  deleteTaskThunk,
} from './task-slice';

import { useAppDispatch, useAppSelector } from '../../services/config/redux/hooks';
import type { AppDispatch, RootState } from '../../services/config/redux/store';
import { TaskStatus } from '../../shared/types/enumerations/task-status-enum';
import type { ITask } from '../../shared/types/task-model';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../shared/components/CreateButton';

const { Title } = Typography;

const pageSize = 10;

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<AppDispatch>();
  const { tasks, loading, current, total } = useAppSelector((state: RootState) => state.task);

  const loadTasks = (page: number) => {
    dispatch(fetchTasksThunk({ page, pageSize }));
  };

  useEffect(() => {
    loadTasks(current);
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    dispatch(deleteTaskThunk(id)).then((action) => {
      if (deleteTaskThunk.fulfilled.match(action)) {
        loadTasks(current);
      }
    });
  };

  const handleEdit = (task: ITask) => {
    navigate(`/tasks/${task.id}/edit`);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'green';
      case TaskStatus.PAUSED:
        return 'red';
      case TaskStatus.STARTED:
        return 'blue';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return <Spin fullscreen />;
  }

  if (!loading && tasks.length === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <CreateButton to="/tasks/create" type="primary" entityName="Task" />
        </div>
        <Title level={2}>No Tasks Available</Title>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Task List</Title>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <CreateButton to="/tasks/create" type="primary" entityName="Task" />
      </div>
      <Row gutter={[16, 16]}>
        {tasks.map((task) => (
          <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
            <Card
              title={task.title}
              variant='outlined'
              extra={<Tag color={getStatusColor(task.status)}>{task.status}</Tag>}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(task)} />,
                <Popconfirm
                  key="delete"
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => task.id !== undefined && handleDelete(task.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined />
                </Popconfirm>,
              ]}
            >
            </Card>
          </Col>
        ))}
      </Row>

      {tasks.length > 0 && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={(page) => loadTasks(page)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
