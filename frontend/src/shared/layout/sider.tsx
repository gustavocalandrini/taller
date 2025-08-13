import { Layout } from 'antd';
import SiderMenu from './menu';
import logo from '../../assets/logo.jpg';
const { Sider } = Layout;

interface AppSiderProps {
  collapsed: boolean;
}

const AppSider = ({ collapsed }: AppSiderProps) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <div
        style={{
          height: 64,
          margin: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: 50,
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      <SiderMenu />
    </Sider>
  );
};

export default AppSider;
