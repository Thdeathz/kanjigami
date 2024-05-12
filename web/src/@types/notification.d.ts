export type NotificationType = 'STACK' | 'EVENT' | 'ADMIN'

export interface INotification {
  id: string
  user: {
    id: string
    name: string
    image: string
  }
  type: NotificationType
  action: string
  link: string
  point: number
  createdAt: string
}
