const defaultResponse = <T>(message: string, status: number, data?: T) => {
  return Object.freeze({
    message,
    status,
    data,
  })
}

const pagination = <T>(
  message: string,
  status: number,
  data: T,
  total: number,
  offset: number,
  currentPage: number,
) => {
  return Object.freeze({
    message,
    status,
    data,
    pagination: {
      totalPages: Math.ceil(total / offset),
      currentPage,
      total,
    },
  })
}

export default {
  pagination,
  defaultResponse,
}
