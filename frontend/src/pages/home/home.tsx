import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh', padding: '2rem' }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card style={{ textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Title level={2}>Task Manager</Title>
          <Paragraph style={{ fontSize: '16px', marginTop: '1rem' }}>
            This application was built to manage tasks, providing features to create, edit,
            list, and delete them using a modern tech stack including React, TypeScript, Redux Toolkit, and Ant Design.
          </Paragraph>
          <Paragraph>
            Explore the sidebar to manage tasks and see how the application handles everything from form validation to
            async communication with the backend.
          </Paragraph>
          <Paragraph type="secondary" style={{ marginTop: '2rem' }}>
            Developed with 💻 and ☕ by Gustavo Calandrini
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
