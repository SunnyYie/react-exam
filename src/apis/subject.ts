import instance from './service'

// 获取课程
export const getSubjects = async () => {
  return instance.get('/api/subject')
}

// 创建课程
export const createSubject = async (data: any) => {
  return instance.post('/api/subject', data)
}

// 查找课程
export const findSubject = async (data: any) => {
  return instance.post(`/api/subject/search`, data)
}

// 获得一级课程
export const getSubjectOne = async () => {
  return instance.get('/api/subject/one')
}

// 更新课程
export const updateSubject = async (two_id: string, data: any) => {
  return instance.patch(`/api/subject/two/${two_id}`, data)
}

// 删除课程
export const deleteSubject = async (id: string) => {
  return instance.delete(`/api/subject/two/${id}`)
}
