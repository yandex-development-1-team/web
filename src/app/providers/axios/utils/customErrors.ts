export class ApiError extends Error {
  public status: number
  public code?: string
  public details?: unknown

  constructor(status: number, code?: string, details?: unknown) {
    super(`API Error ${status}: ${code || 'Unknown error'}`)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export class NetworkError extends Error {
  constructor() {
    super('Network connection error')
    this.name = 'NetworkError'
  }
}

export class CancelledRequestError extends Error {
  constructor() {
    super('Request was cancelled')
    this.name = 'CancelledRequestError'
  }
}
