import { NotificationType } from '@prisma/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export interface INewestNotification {
  id: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
  type: NotificationType
  action: string
  link: string
  point: number | null
  createdAt: Date
}

dayjs.extend(relativeTime)

const getNewestNotification = (notifications: INewestNotification[]) =>
  notifications.map((notification) => ({
    ...notification,
    createdAt: dayjs(notification.createdAt).fromNow(),
  }))

export default {
  getNewestNotification,
}
