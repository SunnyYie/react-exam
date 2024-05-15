import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'
import { Role } from '@/apis/request'

interface BaseInfo {
  role: Role
  _id: string
  phone: string
  has_person_info: boolean
  img: string
}
interface ExtraInfo {
  avatar?: string
  created: string
  graduation_time: string
  money: string
  name: string
}

export type MenuItem = {
  label: string
  key: string
  path: string
  hasMenu: boolean
}
// 用户信息
export type RoleState = BaseInfo & ExtraInfo

type UserState = {
  userInfo: RoleState
  menuInfo: {
    menu: MenuItem[]
    activeKey: string
  }
}

// 获取用户信息
const USER_INFO_KEY = 'userInfo'
const getUserInfo = <T>() => {
  const data = window.localStorage.getItem(USER_INFO_KEY)
  if (!data)
    return {
      role: 'student',
      _id: '',
      phone: '',
      has_person_info: false,
      img: '',
    } as T
  return JSON.parse(data) as T
}

// 持久化存储用户信息
const setUserInfo = (data: RoleState) => {
  if (window.localStorage.getItem(USER_INFO_KEY)) {
    const oldData = JSON.parse(window.localStorage.getItem(USER_INFO_KEY) as string)
    window.localStorage.setItem(USER_INFO_KEY, JSON.stringify({ ...oldData, ...data }))
  } else {
    window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(data))
  }
}

export const updateHasInfo = () => {
  if (localStorage.getItem(USER_INFO_KEY)) {
    const data = JSON.parse(localStorage.getItem(USER_INFO_KEY) as string)
    data.has_person_info = true
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(data))
  }
}

const initialState: UserState = {
  menuInfo: {
    menu: [],
    activeKey: '',
  },
  userInfo: getUserInfo<RoleState>(),
}

export const ResetUser = createSlice({
  name: 'resetUser',
  initialState,
  reducers: {
    set_userInfo(state, aciton) {
      setUserInfo(aciton.payload)

      state.userInfo._id = aciton.payload._id
      state.userInfo.has_person_info = aciton.payload.has_person_info
      state.userInfo.img = aciton.payload.img
      state.userInfo.phone = aciton.payload.phone
      state.userInfo.role = aciton.payload.role
    },
    logout(state) {
      localStorage.clear()
      state.userInfo = getUserInfo<RoleState>()
    },
    set_menu(state, aciton: { payload: MenuItem[] }) {
      state.menuInfo.menu = aciton.payload
    },
    set_active_key(state, action) {
      state.menuInfo.activeKey = action.payload
    },
  },
})

export const select_menu = (state: RootState) => state.resetUser.menuInfo.menu
export const select_active_key = (state: RootState) => state.resetUser.menuInfo.activeKey

export const select_user = (state: RootState) => {
  return state.resetUser
}

export const select_user_info = (state: RootState) => {
  return state.resetUser.userInfo
}

export const { set_userInfo, logout, set_active_key, set_menu } = ResetUser.actions

export default ResetUser.reducer
