import { Layout } from 'antd';
import { useState, type ReactNode } from 'react';
import AppSider from './sider';
import AppHeader from './header';
import AppContent from './content';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider collapsed={collapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <AppContent>{children}</AppContent>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
