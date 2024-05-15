import instance from './service'

export interface RoleParams {
  phone: string
  code: string
}

// 新增管理员
export const addUser = (data: any) => {
  return instance.post('/api/user/add_admin', data)
}

// 获取权限菜单
export const getPermissionMenu = () => {
  return instance.get('/api/user/menu')
}

// 登录
export const login = (data: RoleParams) => {
  return instance.post('/api/user/login', data)
}

// 退出登录
export const logout = () => {
  return instance.post('/api/user/logout')
}

// 获取用户信息
export const getUserInfo = () => {
  return instance.get('/api/user')
}

// 查找学生
export const findStudent = (data: any) => {
  return instance.get('/api/user/student', { params: data })
}

// 查找管理员
export const findAdmin = () => {
  return instance.get('/api/user/admin')
}

// 修改用户信息
export const updateUserInfo = (data: any) => {
  return instance.patch(`/api/user/${data.id}`, data)
}

// 删除用户
export const deleteUser = (id: string) => {
  return instance.delete(`/api/user/${id}`)
}
