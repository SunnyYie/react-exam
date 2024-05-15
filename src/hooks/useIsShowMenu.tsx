import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { select_menu } from '@/store/resetUser'

// 是否显示菜单
function useIsShowMenu() {
  const location = useLocation()
  const key = location.pathname.split('/')[1]

  const menus = useAppSelector(select_menu)

  if (!key) {
    return false
  }

  const item = menus.find((item) => item.key === key)

  if (!item) return false

  if (item.hasMenu) {
    return true
  } else {
    return false
  }
}

export default useIsShowMenu
