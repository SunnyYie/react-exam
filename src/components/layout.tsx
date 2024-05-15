import { useEffect } from 'react'
import { Outlet } from 'react-router'
import useIsShowMenu from '@/hooks/useIsShowMenu'
import { useAppDispatch } from '@/store'
import Header from './header'
import Menu from './menu'
import { getPermissionMenu } from '@/apis/user'
import { set_menu } from '@/store/resetUser'

export default function Layout() {
  const dispatch = useAppDispatch()
  const isShowMenu = useIsShowMenu()

  useEffect(() => {
    const getMenus = async () => {
      const res = await getPermissionMenu()

      dispatch(set_menu(res.data.data))
    }
    getMenus()
  }, [])

  return (
    <div className="layout">
      <div style={{ height: 80, background: 'grey' }}>
        <Header />
      </div>

      {isShowMenu && (
        <div className="menu">
          <Menu />
        </div>
      )}

      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
