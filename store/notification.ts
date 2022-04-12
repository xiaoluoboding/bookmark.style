import { defineStore } from 'pinia'

import { NotificationState, NotificationItem } from '@/types'

export const useNotificationStore = defineStore({
  id: 'notification',

  state: (): NotificationState => ({
    notificationList: []
  }),

  actions: {
    addNotification(message: NotificationItem) {
      this.notificationList.push(message)
    },
    removeNotification(item: NotificationItem) {
      const index = this.notificationList.indexOf(item)
      if (index >= 0) this.notificationList.splice(index, 1)
    }
  }
})