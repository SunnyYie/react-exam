import instance from './service'

// 查询考试记录
export const getExamList = (data?: any) => {
  return instance.post('/api/exam', data)
}

// 进入考场
export const enterExam = (exam_id: any) => {
  return instance.get(`/api/exam/${exam_id}`)
}

// 创建考试记录
export const createExam = (data: any) => {
  return instance.post('/api/exam/create', data)
}

// 查询考试记录
export const findExam = (data: any) => {
  return instance.post('/api/exam/search', data)
}

// 批改试卷
export const correctExam = (id: any, data: any) => {
  return instance.patch(`/api/exam/${id}`, data)
}

// 删除考试记录
export const deleteExam = (id: any) => {
  return instance.delete(`/api/exam/${id}`)
}
