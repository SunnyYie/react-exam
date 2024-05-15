import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/apis/service'
import { RootState } from './index'
import type { FormInstance } from 'antd/lib/form'
import { AxiosRes, ResData } from '@/apis/request'

export interface StudentManagement {
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
  key: string // 添加 key 属性
}

type studentManagementState = {
  loading: boolean
  modalVisible: boolean
  student_management: StudentManagement[] // 学员数据
  subject_one: StudentManagement[] // 课程一级列表
  form: FormInstance // 添加 form 属性
}

const initialState = {
  loading: false,
  modalVisible: false, //编辑弹窗状态
  student_management: [],
  subject_one: [],
  form: {} as FormInstance,
} as studentManagementState

export const get_student_management = createAsyncThunk<StudentManagement[], void>('get/student_management', async (action, state) => {
  const res: AxiosRes<ResData<StudentManagement[]>> = await axios.get('/api/user/student')
  return res.data.data
})

// 获取课程一级列表
export const get_subject_one = createAsyncThunk<StudentManagement[], void>('get/subject_one', async (_, state) => {
  const res: AxiosRes<ResData<StudentManagement[]>> = await axios.get('/api/subject/one')
  return res.data.data
})

export const studentManagementSlice = createSlice({
  name: 'student_management',
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // 获取学生列表fulfilled
      .addCase(get_student_management.fulfilled, (state, res) => {
        state.student_management = res.payload
      })
      // 获取课程列表fulfilled
      .addCase(get_subject_one.fulfilled, (state, res) => {
        state.subject_one = res.payload
      })
  },
})

// 获取loading状态
export const student_management_loading = (state: RootState) => {
  return state.student_management.loading
}
// 获取学员数据
export const get_student_management_list = (state: RootState) => {
  return state.student_management.student_management
}
// 获取课程一级数据
export const get_subject_one_list = (state: RootState) => {
  return state.student_management.subject_one
}

export const { setModalVisible } = studentManagementSlice.actions

export default studentManagementSlice.reducer
