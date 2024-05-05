export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface PaginationApiResponse<T> extends ApiResponse<T> {
  pagination: {
    totalPages: number
    currentPage: number
    total: number
  }
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

export interface IFile extends File {
  preview?: string
}
