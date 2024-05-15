import React, { FC, useEffect, useState } from 'react'
import { ConfigProvider, Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import zh_CN from 'antd/es/locale/zh_CN'

const LIST_PAGE_NAME = 'page'
const LIST_PAGE_SIZE_NAME = 'pageSize'

type PropsType = {
  total: number
}

const PageList: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    /**
     * 监视地址栏的变化，当变化修改page pagesize状态
     */
    const page = parseInt(searchParams.get(LIST_PAGE_NAME) || '') || 1
    setPage(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_NAME) || '') || 10
    setPageSize(pageSize)
  }, [searchParams])

  /**
   *
   * @param page 当前页面
   * @param pageSize 当前的页面数据量
   *  当发生变化时，拼接在地址栏的
   */
  const changePageClick = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_NAME, page + '')
    searchParams.set(LIST_PAGE_SIZE_NAME, pageSize + '')
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <ConfigProvider locale={zh_CN}>
      <Pagination current={page} pageSize={pageSize} total={total} onChange={changePageClick} />
    </ConfigProvider>
  )
}

export default PageList
