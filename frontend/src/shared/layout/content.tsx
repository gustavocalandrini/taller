import { Layout } from 'antd';
import { type ReactNode } from 'react';

const { Content } = Layout;

interface AppContentProps {
  children: ReactNode;
}

const AppContent = ({ children }: AppContentProps) => {
  return <Content style={{ margin: 16, padding: 24, background: '#fff' }}>{children}</Content>;
};

export default AppContent;
