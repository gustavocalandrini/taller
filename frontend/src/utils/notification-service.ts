import { notification } from 'antd';

export const notifySuccess = (message: string, description?: string) => {
  notification.success({
    message,
    description,
    placement: 'topRight',
  });
};

export const notifyError = (message: string, description?: string) => {
  notification.error({
    message,
    description,
    placement: 'topRight',
  });
};
