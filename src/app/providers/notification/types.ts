export type NotificationStatus = 'success' | 'error' | 'info';

export interface ShowNotificationParams {
  message: string;
  status: NotificationStatus;
  duration?: number;
}

export interface NotificationContextValue {
  showNotification: (params: ShowNotificationParams) => void;
}
