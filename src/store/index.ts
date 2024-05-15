import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import subjectReducer from './subject'
import userReducer from './user'
import roleReducer from './role'
import examReducer from './exam'
import studentManagementReducer from './student_management'
import resetUserReducer from './resetUser'

// 类型定义
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store = configureStore({
  reducer: {
    subject: subjectReducer,
    user: userReducer,
    role: roleReducer,
    exam: examReducer,
    student_management: studentManagementReducer,
    resetUser:resetUserReducer
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
