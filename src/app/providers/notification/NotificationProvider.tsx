import { useCallback, type ReactNode } from 'react';
import { Toaster, toast } from 'sonner';
import type { ShowNotificationParams } from './types';
import { NotificationContext } from './context';

const DEFAULT_DURATION = 6000;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const showNotification = useCallback(
        ({ message, status, duration = DEFAULT_DURATION }: ShowNotificationParams) => {
            switch (status) {
                case 'success':
                    toast.success(message, { duration });
                    break;
                case 'error':
                    toast.error(message, { duration });
                    break;
                case 'info':
                    toast(message, { duration });
                    break;
            }
        },
        []
    );

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            <Toaster richColors position="top-center" />
            {children}
        </NotificationContext.Provider>
    );
};
