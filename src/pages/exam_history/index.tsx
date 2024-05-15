import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Space, Badge, Table, Button } from 'antd'
import { exam_list_count, set_exam_count, set_exam, exam_list } from '@/store/exam'
import { useAppDispatch, useAppSelector } from '../../store/index'
import { DataType } from './interface'
import PageList from './components/pageList'
import styles from './index.module.css'
import { useNavigate } from 'react-router'
import { getExamList } from '@/apis/exam'

export default function ExamHistory() {
  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const exam_count = useAppSelector(exam_list_count)
  const examList = useAppSelector(exam_list)

  const handleClick = () => {
    navigator(`/read_exam/${1}`)
    // navigator(`/corret_exam/${1}`)
  }

  const tableColumns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '考试类型',
      dataIndex: 'subject_name',
      key: 'subject_name',
    },
    {
      title: '考试时间',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: '状态',
      dataIndex: 'is_judge',
      key: 'is_judge',
      render: (_value, record) => {
        return (
          <Space>
            <Badge status={record.is_judge ? 'success' : 'error'} />
            {record.is_judge ? '已批改' : '未批改'}
          </Space>
        )
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (_value, row) => {
        return (
          <Button
            style={{ color: '#1880FF', borderRadius: '12px', opacity: row.is_judge ? '1' : '0.2', background: '#F2F4F7' }}
            onClick={() => {
              handleClick()
            }}
            disabled={!row.is_judge}
          >
            查看
          </Button>
        )
      },
    },
  ]

  useEffect(() => {
    // 获取考试记录
    const getExamHistoryList = async () => {
      const res = await getExamList()

      dispatch(set_exam_count(res.data.count))
      dispatch(set_exam(res.data.data))
    }

    getExamHistoryList()
  }, [])

  return (
    <div className={styles['exam-history']}>
      <div className="table-list-wrapper">
        <Table dataSource={examList} columns={tableColumns} pagination={false} rowKey={'_id'}/>
      </div>
      <div className={styles['pagination-wrapper']}>
        <PageList total={exam_count} />
      </div>
    </div>
  )
}
