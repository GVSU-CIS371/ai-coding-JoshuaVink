import { defineStore } from 'pinia';

interface NotificationState {
  visible: boolean;
  message: string;
  color: 'success' | 'error' | 'info';
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationState => ({
    visible: false,
    message: '',
    color: 'info'
  }),
  actions: {
    show(message: string, color: NotificationState['color'] = 'info') {
      this.message = message;
      this.color = color;
      this.visible = true;
    },
    success(message: string) {
      this.show(message, 'success');
    },
    error(message: string) {
      this.show(message, 'error');
    }
  }
});
