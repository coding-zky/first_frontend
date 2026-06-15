import request from './request'

export interface User {
  id: number
  name: string
  email: string
  age: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
}

export interface UserQuery {
  page: number
  size: number
  keyword?: string
}

export function listUsers(params: UserQuery) {
  return request.get<PageResult<User>>('/users', { params })
}

export function createUser(data: Omit<User, 'id'>) {
  return request.post<User>('/users', data)
}

export function updateUser(id: number, data: Omit<User, 'id'>) {
  return request.put<User>(`/users/${id}`, data)
}

export function deleteUser(id: number) {
  return request.delete(`/users/${id}`)
}
