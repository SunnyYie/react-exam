import { useEffect, useMemo } from 'react'
import { Table, Button, TableColumnsType } from 'antd'
import CourseAdd from './components/course'
import { handleTransform, isDelete, handleDelete, TransformCourse } from './data'
import { get_subject_tree_async, select_subject_tree } from '@/store/subject'
import { useAppDispatch, useAppSelector } from '@/store'
import styles from './index.module.scss'

function SubjectManage() {
  const dispatch = useAppDispatch()
  const lessonList = useAppSelector(select_subject_tree)

  const columns: TableColumnsType<TransformCourse> = [
    {
      title: '排序',
      dataIndex: 'value',
      key: 'value',
      width: 120,
      render(a, b, c) {
        return <span>{c + 1}</span>
      },
    },
    {
      title: '课程类别',
      dataIndex: 'title',
      key: 'title',
      render(a, b) {
        return <div>{b.parent || b.title}</div>
      },
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      render(_, b) {
        return isDelete(b) ? (
          <Button onClick={handleDelete.bind(null, b.value, b.title, getRemoteData)} danger type="link">
            删除
          </Button>
        ) : null
      },
    },
  ]

  const transformData = useMemo(() => {
    let d = lessonList.length === 0 ? [] : handleTransform(lessonList)
    return d
  }, [lessonList])

  function getRemoteData() {
    return dispatch(get_subject_tree_async())
  }

  useEffect(() => {
    let a = getRemoteData()
    return () => {
      a.abort()
    }
  }, [])
  
  return (
    <div className={styles.wrap}>
      <div className={styles['my-4']}>
        <CourseAdd handleSuccess={getRemoteData}>
          <Button type="primary" style={{ borderRadius: '2px' }}>
            新增课程
          </Button>
        </CourseAdd>
      </div>
      <div className={styles['my-4']}>
        {transformData.length === 0 ? (
          <div>
            <Table className={styles.tables} rowKey={'value'} columns={columns}></Table>
          </div>
        ) : (
          <Table
            className={styles.tables}
            expandable={{
              expandRowByClick: true,
              defaultExpandAllRows: true,
            }}
            rowKey={'value'}
            dataSource={transformData}
            columns={columns}
          ></Table>
        )}
      </div>
    </div>
  )
}

export default SubjectManage
