import axios from './service'

export type AxiosRes<T = ResData> = {
  config: Object
  data: T
  headers: any
  request: any
  status: number
  statusText: string
}

export type ResData<T = any> = {
  code: number
  msg: string
  data: T
}

export type AxiosResData<T = any> = AxiosRes<ResData<T>>

/**
 * 登录
 */
export interface LoginData {
  code: string
  phone: string
}

/**
 * 权限
 */
export type Role = 'student' | 'admin' | 'super_admin'

export type MenuItem = {
  label: string
  key: string
  path: string
  hasMenu: boolean
}

/**
 * 管理员信息
 */
export interface AdminInfoList {
  id: number
  phone: string
  name: string
}

/**
 * 学生信息
 */
export interface UserInfo {
  name?: string // 学生花名
  vChat: string // 微信名字
  phone: string // 手机
  avatar: string // 头像
  graduation_time: Date // 毕业时间
  money: number // 现在薪资
  role: string // 角色
  _id: string
  has_person_info: boolean // 是否填写个人信息
  edu: string // 学历
  key: string
}

/**
 * 课程
 */

// 单个课程类型
export type LessonType = {
  title: string
  value: string
  children: LessonType[]
  can_exam: boolean
}

// 单个题目类型
export type TopicType = {
  dec: string
  title: string
  two_id: string
  _id: string
  img: string[]
}

/**
 * 考试
 */

// 考试题目
export type ExamData = {
  testDateTime: string
  topicList: TopicData[]
  two_id: string
  _id: string
  is_judge: boolean
}

// 单个考试题目
export type ExamItem = {
  title: string // 标题
  dec: string // 描述
  img: any // 图片地址
  answer: string // 答案
}

// 提交考试答案
export type ExamAnswer = {
  topic_list: ExamItem[]
  two_id: string // 题目二级分类id
}

// 提交批阅结果
export type ExamJudge = {
  topic_list: TopicData[]
  two_id: string // 题目二级分类id
}

// 考试题目详情
export type TopicData = {
  dec: string
  title: string
  two_id: string
  _id: string
  img: any
  answer: string
  comment: string
  pass: boolean
  is_correct: boolean
}

// 每个学生的考试记录
export type StudentExamRecord = {
  _id: string
  username: string
  two_id: string
  time: string
  isJudge: boolean
  topic_list: TopicData[]
}

// 获取管理员信息
export function getAdminInfoRequest() {
  return new Promise<AdminInfoList[]>(async (resolve, reject) => {
    const res: AxiosResData<AdminInfoList[]> = await axios.get('/api/admin')
    resolve(res.data.data || {})
  })
}

// 获取菜单
export function getMenuRequest() {
  return new Promise<MenuItem[]>(async (resolve, reject) => {
    const res: AxiosResData<MenuItem[]> = await axios.get('/api/menu')
    resolve(res.data.data || [])
  })
}

// 登录
export function loginRequest(data: LoginData) {
  return new Promise<UserInfo>(async (resolve, reject) => {
    const res: AxiosResData<UserInfo> = await axios.post('/api/user/login', data)
    resolve(res.data.data)
  })
}

// 退出登录
export function logoutRequest() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.post('/api/user/logout')
    resolve(res.data.data)
  })
}

// 获取学生信息
export function getUserInfoRequest() {
  return new Promise<UserInfo>(async (resolve, reject) => {
    const res: AxiosResData<UserInfo> = await axios.get('/api/user')
    resolve(res.data.data)
  })
}

// 修改用户信息
// todo：传递参数
export function updateUserInfoRequest(data: UserInfo) {
  return new Promise<UserInfo>(async (resolve, reject) => {
    const res: AxiosResData<UserInfo> = await axios.patch(`/api/user/${1}`, data)
    resolve(res.data.data)
  })
}

// 修改学生的课程考试权限
export function updateStudentLessonRequest(data: { username: string; title: string[] }) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.patch(`/api/user/${data.username}`, { lesson: data.title })
    resolve(res.data.data)
  })
}

// 获取课程列表
export function getExamListRequest() {
  return new Promise<LessonType[]>(async (resolve, reject) => {
    const res: AxiosResData<LessonType[]> = await axios.get('/api/topic')
    resolve(res.data.data)
  })
}

// 新增课程
export function addLessonRequest(data: LessonType) {
  return new Promise<LessonType>(async (resolve, reject) => {
    const res: AxiosResData<LessonType> = await axios.post('/api/topic', data)
    resolve(res.data.data)
  })
}

// 删除课程
export function deleteLessonRequest(id: string) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.delete(`/api/topic/${id}`)
    resolve(res.data.data)
  })
}

// 获取该课程的题目列表
export function getTopicListRequest(id: string) {
  return new Promise<TopicType[]>(async (resolve, reject) => {
    const res: AxiosResData<TopicType[]> = await axios.get(`/api/topic/${id}`)
    resolve(res.data.data)
  })
}

// 新增题目
export function addTopicRequest(data: TopicType) {
  return new Promise<TopicType>(async (resolve, reject) => {
    const res: AxiosResData<TopicType> = await axios.post('/api/topic', data)
    resolve(res.data.data)
  })
}

// 删除题目
export function deleteTopicRequest(id: string) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.delete(`/api/topic/${id}`)
    resolve(res.data.data)
  })
}

// 提交考试答案
export function submitExamRequest(data: ExamAnswer) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.post('/api/exam', data)
    resolve(res.data.data)
  })
}

// 查看考试记录
export function getExamRecordRequest(data: { username: string; two_id: string }) {
  return new Promise<ExamData[]>(async (resolve, reject) => {
    const res: AxiosResData<ExamData[]> = await axios.get(`/api/exam/${data.username}/${data.two_id}`)
    resolve(res.data.data)
  })
}

// 获取批阅试卷列表
export function getExamFinishedListRequest() {
  return new Promise<StudentExamRecord[]>(async (resolve, reject) => {
    const res: AxiosResData<StudentExamRecord[]> = await axios.get('/api/exam')
    resolve(res.data.data)
  })
}

// 提交批阅结果
export function submitExamJudgeRequest(data: ExamJudge) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.patch('/api/exam', data)
    resolve(res.data.data)
  })
}
