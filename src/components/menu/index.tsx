import React, { useEffect } from 'react'
import type { MenuProps } from 'antd'
import { Menu as AntdMenu } from 'antd'
import { useNavigate } from 'react-router'
import { RouterKeys, routersData } from '@/config'
import { select_active_key, select_menu, set_active_key } from '@/store/resetUser'
import { useAppDispatch, useAppSelector } from '@/store'
import usePathKey from '@/hooks/usePathKeys'

export default function Menu() {
  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const pathKey = usePathKey()

  const menus = useAppSelector(select_menu)
  const activeKey = useAppSelector(select_active_key)

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(set_active_key(e.key))
    navigator(routersData[e.key as RouterKeys].path)
  }

  useEffect(() => {
    if (pathKey) {
      dispatch(set_active_key(pathKey))
    }
  }, [])

  return <AntdMenu onClick={onClick} selectedKeys={[activeKey]} mode="horizontal" items={menus} />
}
