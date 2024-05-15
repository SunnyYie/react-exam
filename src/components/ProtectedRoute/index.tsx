import { routersData } from '@/config'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { select_role } from '@/store/role'

// 检查用户是否有权限访问某个路由
export const ProtectedRoute = ({ element, path }: { element: React.ReactElement; path: string }) => {
  const role = useSelector(select_role)

  const checkPermission = (route: string) => {
    console.log(role)

    return true
  }

  return checkPermission(path) ? element : <Navigate to={routersData.exam_select.path} />
}
