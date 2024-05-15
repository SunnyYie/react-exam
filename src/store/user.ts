import axios from '@/apis/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'
import { AxiosRes, ResData } from '@/apis/request'

export type MenuItem = {
  label: string
  key: string
  path: string
  hasMenu: boolean
}

type MenuState = {
  menu: MenuItem[]
  activeKey: string
}

const initialState: MenuState = {
  menu: [],
  activeKey: '',
}

export const get_menu = createAsyncThunk<MenuItem[], void>('get/menu', async (action, state) => {
  const res: AxiosRes<ResData<MenuItem[]>> = await axios.get('/api/user/menu')
  return res.data.data
})

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set_menu(state, aciton: { payload: MenuItem[] }) {
      state.menu = aciton.payload
    },
    set_active_key(state, action) {
      state.activeKey = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(get_menu.fulfilled, (state, aciton) => {
      state.menu = aciton.payload
    })
  },
})

export const select_menu = (state: RootState) => state.user.menu
export const select_active_key = (state: RootState) => state.user.activeKey

export const { set_menu, set_active_key } = menuSlice.actions

export default menuSlice.reducer
