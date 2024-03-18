export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface ApiError {
  status: number
  message: string
}

export interface ActionError<T> {
  error: T
}

export interface IFormItemError {
  message: string
  field: string
}
