import React, { useEffect, useState } from 'react'
import { Table, TableColumnsType, Button, Col, Input, Row } from 'antd'
import { AdminInfoList } from '@/apis/request'

const testData: AdminInfoList[] = [
  {
    id: 1,
    phone: '15798642464',
    name: '15798642464',
  },
  {
    id: 2,
    phone: '15798642464',
    name: '15798642464',
  },
  {
    id: 3,
    phone: '15798642464',
    name: '15798642464',
  },
]

export default function AdminManage() {
  const [data, setData] = useState<AdminInfoList[]>([])
  const [selectedPhone, setSelectedPhone] = useState<string>('')

  const handleSearch = (value: string) => {
    const newCourse: AdminInfoList = {
      id: data.length + 1,
      phone: value,
      name: value,
    }

    setData((prevData) => [...prevData, newCourse])
  }

  const handleDelete = (record: AdminInfoList) => {
    setData((prevData) => prevData.filter((item) => item.id !== record.id))
  }

  const columns: TableColumnsType<AdminInfoList> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <Button danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </>
      ),
    },
  ]

  useEffect(() => {
    setData(testData)
  }, [])

  return (
    <>
      <Row style={{ padding: 10 }}>
        <Col span={3}>
          <Input placeholder="请输入手机号" style={{ width: '100%' }} value={selectedPhone} onChange={(e) => setSelectedPhone(e.target.value)} />
        </Col>

        <Col span={4}>
          <Button type="primary" className="margin-left" onClick={() => handleSearch(selectedPhone)}>
            设置管理员
          </Button>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} rowKey={(record) => record.id.toString()} />
    </>
  )
}
