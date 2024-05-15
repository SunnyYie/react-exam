import axios from '@/apis/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'

export type examquetions = {
  created: string
  img: any[]
  title: string
  two_id: string
  _id: string
  dec?: string
}

export const get_exam = createAsyncThunk<examquetions[], string>('get/exam', async (aciton, state) => {
  const res = await axios.get(`/api/topic/${aciton}`)

  const arr = res.data.data[0].exam.map((item: examquetions, index: number) => {
    const rawValue = window.localStorage.getItem('topic_list')

    return {
      ...item,
      isKeep: rawValue ? rawValue[index] : false,
    }
  })

  return [{ exam: arr, count: res.data.data[0].count }] as any
})

export const get_exam_list = createAsyncThunk('get/exam', async (actions) => {
  const res = await axios.get(`/api/exam/${actions}`)
  return res.data.data
})

const initialState = {
  exam: [],
  count: 0,
  topic_list: [],
}

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    set_exam: (state, action) => {
      state.exam = action.payload
    },
    set_exam_count: (state, action) => {
      state.count = action.payload
    },
    set_exam_topic_list: (state, action) => {
      state.topic_list = action.payload
    },
  },
})

export const exam_list = (state: RootState) => {
  return state.exam.exam as any
}
export const exam_list_count = (state: RootState) => {
  return state.exam.count
}
export const exam_topic_list = (state: RootState) => {
  return state.exam.topic_list
}
export const { set_exam, set_exam_count,set_exam_topic_list } = examSlice.actions
export default examSlice.reducer
