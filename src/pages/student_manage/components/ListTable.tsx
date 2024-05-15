import React, { useEffect, useCallback, useRef } from 'react'
import { Modal, Table, TableColumnsType, Divider, Button, Col, Input, Row, Space, Select, Form, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { get_student_management, get_subject_one, get_student_management_list, get_subject_one_list, student_management_loading, setModalVisible, StudentManagement } from '@/store/student_management'
import type { FormInstance } from 'antd/lib/form'
import axios from '@/apis/service'

const { Option } = Select
const { confirm } = Modal

const ListTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const studentManagement = useAppSelector(get_student_management_list)
  const subjectList = useAppSelector(get_subject_one_list)
  const loading = useAppSelector(student_management_loading)
  const formRef = useRef<FormInstance>(null)
  useEffect(() => {
    dispatch(get_student_management())
    dispatch(get_subject_one())
  }, [])

  const handleSearch = useCallback(() => {
    const { current: form } = formRef
    const { name, key } = form?.getFieldsValue()
    // dispatch(get_student_management({ name,key}));
    // 执行查询操作
  }, [])

  const handleReset = useCallback(() => {
    const { current: form } = formRef
    form?.resetFields()
    // dispatch(get_student_management());
  }, [])
  const editPermissions = (record: any) => {
    dispatch(setModalVisible(true))
    axios.patch(`/api/user/${record._id}`)
  }
  const handleDelete = (record: string | any) => {
    confirm({
      title: '确认删除?',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 删除接口
          await axios.delete(`/api/subject/${record._id}`)
          message.success('删除成功')
        } catch {
          message.error('删除失败')
        }
      },
    })
  }

  const columns: TableColumnsType<StudentManagement> = [
    {
      title: '花名',
      dataIndex: 'name',
    },
    {
      title: '当前薪资',
      dataIndex: 'money',
    },
    {
      title: '学历',
      dataIndex: 'edu',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '课程权限',
      dataIndex: 'role',
    },
    {
      title: '操作',
      width: 380,
      dataIndex: 'option',
      render: (_: any, record: any) => [
        <a key="jurisdictionEdit" onClick={() => editPermissions(record)}>
          编辑
        </a>,
        <Divider type="vertical" />,
        <a key="delete" onClick={() => handleDelete(record)}>
          删除
        </a>,
      ],
    },
  ]

  return (
    <>
      <Form ref={formRef}>
        <Row style={{ padding: 10 }}>
          <Col span={3}>
            <Form.Item name="name" style={{ width: '98%' }}>
              <Input placeholder="请输入学员花名" style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="key" style={{ width: '98%' }}>
              <Select style={{ width: '98%' }} placeholder="请选择课程">
                {subjectList?.map((subject) => (
                  <Option key={subject.key} value={subject.key}>
                    {subject.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Space>
              <Button type="primary" className="margin-left" onClick={handleSearch}>
                查询
              </Button>
              <Button className="margin-left" onClick={handleReset}>
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table loading={loading} dataSource={studentManagement} columns={columns} />
    </>
  )
}

export default ListTable
