import instance from "./service"

// 创建题目
export const createTopic = (data: any) => {
  return instance.post('/api/topic', data)
}

// 查找题目
export const findTopic = (subject_two_id: any) => {
  return instance.get(`/api/topic/${subject_two_id}`)
}

// 更新题目
export const updateTopic = (two_id: any, data: any) => {
  return instance.patch(`/api/topic/${two_id}`, data)
}

// 删除题目
export const deleteTopic = (two_id: any) => {
  return instance.delete(`/api/topic/${two_id}`)
}