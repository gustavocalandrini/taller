import { Layout, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const AppHeader = ({ collapsed, toggleCollapsed }: AppHeaderProps) => {

  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginRight: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserOutlined />
          </div>
        </div>       
      </div>
    </Header>
  );
};

export default AppHeader;
