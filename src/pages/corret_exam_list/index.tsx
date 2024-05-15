import { Form, Input, Button, Space, Row, Col, Table, Select } from 'antd'
import { exam_list, set_exam, set_exam_count } from '@/store/exam'
import { useAppSelector, useAppDispatch } from '../../store/index'
import { useEffect } from 'react'
import { getExamList } from '@/apis/exam'
import { useNavigate } from 'react-router'

function CorretExamList() {
  const exam = useAppSelector(exam_list)
  const Navigate = useNavigate()

  const dispatch = useAppDispatch()

  const columns = [
    {
      title: '序号',
      key: '_id',
      dataIndex: '_id',
    },
    {
      title: '花名',
      key: 'user_name',
      dataIndex: 'user_name',
    },
    {
      title: '考试类型',
      key: 'subject_name',
      dataIndex: 'subject_name',
    },
    {
      title: '考试时间',
      key: 'created',
      dataIndex: 'created',
    },
    {
      title: '状态',
      key: 'is_judge',
      dataIndex: 'is_judge',
      render(a: any) {
        if (a) {
          return '已批改'
        }

        return '未批改'
      },
    },
    {
      title: '操作',
      key: 'action',
      render(current: any) {
        return (
          <Button type={'link'} onClick={() => Navigate(`/corret_exam/${current.two_id} ${current._id}`)}>
            批改
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
    <div style={{ padding: '0 24px 24px 24px', backgroundColor: 'white', marginTop: 10 }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Form layout={'inline'}>
            <Form.Item>
              <Input placeholder="请输入学员花名" />
            </Form.Item>
            <Form.Item>
              <Select placeholder="请选择考试类型" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={alert.bind(null, '代码未完成!')} type={'primary'}>
                  搜索
                </Button>
                <Button onClick={alert.bind(null, '代码未完成!')}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
          <Table dataSource={exam} columns={columns} rowKey={'_id'}></Table>
        </Col>
      </Row>
    </div>
  )
}

export default CorretExamList
