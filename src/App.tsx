import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { routersData } from './config'
import Login from '@/pages/login'
import Layout from './components/layout'
import AdminManage from './pages/admin-manage'
import CorretExam from './pages/corret_exam'
import CorretExamList from './pages/corret_exam_list'
import Exam from './pages/exam'
import ExamHistory from './pages/exam_history'
import ExamSelect from './pages/exam_select'
import PersonInfo from './pages/person_info'
import ReadExam from './pages/read_exam'
import StudentManage from './pages/student_manage'
import SubjectAdd from './pages/subject_add'
import SubjectManage from './pages/subject_manage'
import { useEffect } from 'react'
import event from './utils/event'
// import useRenderCheck from './hooks/useRenderCheck'

function App() {
  const navigator = useNavigate()
  // useRenderCheck('App')

  useEffect(() => {
    event.on('global_not_login', () => {
      navigator('/login')
    })
  }, [])

  useEffect(() => {
    if (!window.localStorage.getItem('userInfo')) {
      navigator('/login')
    }
  }, [window.localStorage.getItem('userInfo')])

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'}></Navigate>}></Route>

      <Route id={routersData.login.path} path={routersData.login.path} element={<Login />} />

      <Route element={<Layout />}>
        {/*页面12： 管理员管理 （超级管理员） */}
        <Route path={routersData.admin_manage.path} element={<AdminManage />}></Route>
        {/* 页面8： 批改试卷（管理员） */}
        <Route path={routersData.corret_exam.path} element={<CorretExam />}></Route>
        {/* 页面7： 批阅试卷列表（管理员） */}
        <Route path={routersData.corret_exam_list.path} element={<CorretExamList />}></Route>
        {/* 页面4： 考试 (学生) */}
        <Route path={routersData.exam.path} element={<Exam />}></Route>
        {/* 页面5： 学生考试记录 （学生） */}
        <Route path={routersData.exam_history.path} element={<ExamHistory />}></Route>
        {/* 页面3： 考题选择 （学生） */}
        <Route path={routersData.exam_select.path} element={<ExamSelect />}></Route>
        {/* 页面2： 个人信息录入（学生 管理员） */}
        <Route path={routersData.person_info.path} element={<PersonInfo />}></Route>
        {/* 页面6 查看试卷（学生 管理员） */}
        <Route path={routersData.read_exam.path} element={<ReadExam />}></Route>
        {/* 页面9： 学生管理(管理员) */}
        <Route path={routersData.student_manage.path} element={<StudentManage />}></Route>
        {/* 页面11： 考题录入（管理员） */}
        <Route path={routersData.subject_add.path} element={<SubjectAdd />}></Route>
        {/* 页面10： 课程管理 （管理员） */}
        <Route path={routersData.subject_manage.path} element={<SubjectManage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
