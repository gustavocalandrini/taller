import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface CreateButtonProps {
  to: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  entityName: string;
  children?: React.ReactNode;
}

const CreateButton: React.FC<CreateButtonProps> = ({ to, type = 'default', entityName, children }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Button type={type} onClick={() => navigate(to)}>
        {children || `+ Create ${entityName}`}
      </Button>
    </div>
  );
};

export default CreateButton;
