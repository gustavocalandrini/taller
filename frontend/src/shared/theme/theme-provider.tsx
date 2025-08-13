import { ConfigProvider, theme } from "antd";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
                colorPrimary: '#4836d5',
                borderRadius: 4,
            },
        }}>
            {children}
        </ConfigProvider>
    );
}

export default ThemeProvider;