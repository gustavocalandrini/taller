import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './services/config/redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ThemeProvider from './shared/theme/theme-provider.tsx'
import { App as AntdApp } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider>
          <ThemeProvider>
            <AntdApp>
              <App />
            </AntdApp>
          </ThemeProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
