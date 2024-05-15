import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Select, Upload, Button, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { useNavigate } from 'react-router'
import { routersData } from '@/config'
import { useDispatch } from 'react-redux'
import { upload_imgs } from '@/utils/uploadImages'
import axios from '@/apis/service'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import IMG from './img/info.png'
import { AxiosRes, ResData } from '@/apis/request'
import { set_userInfo, updateHasInfo } from '@/store/resetUser'
import useStorage from '@/hooks/useStorage'
import './index.scss'

const OPTIONS = ['大专', '本科', '硕士', '博士']
let imgUrl = ''

export default function PersonInfo() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useStorage('userInfo')
  const { _id, has_person_info, money } = JSON.parse(value)

  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onFinish = async (values: any) => {
    let params = {
      ...values,
      avatar: imgUrl,
    }
    const { data }: AxiosRes<ResData> = await axios.patch(`/api/user/${_id}`, params)

    if (data.code === 0) {
      if (!has_person_info) {
        message.success('个人信息录入成功')
        updateHasInfo()
        Navigate(`/exam_select`)
      } else {
        message.success('修改成功')
      }
    }
  }

  const onFinishFailed = () => {
    if (!has_person_info) {
      message.error('表单信息缺失')
    } else {
      message.error('修改失败')
    }
  }

  const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList)
      const [imgURL] = (await upload_imgs(info.fileList).catch(() => {
        setFileList([])
      })) as string[]

      imgUrl = imgURL
    }
  }

  useEffect(() => {
    const init = async () => {
      const { data }: AxiosRes<ResData> = await axios.get('/api/user')
      if (data.code === 0) {
        dispatch(set_userInfo(data.data))

        form.setFieldsValue(data.data)
        form.setFieldValue('graduation_time', dayjs(data.data.graduation_time))
        setFileList([
          {
            uid: data.data._id,
            name: 'backImg',
            status: 'done',
            url: `https://${data.data.avatar}`,
          },
        ])
      }
    }

    if (has_person_info) {
      if (!money) {
        init()
      } else {
        form.setFieldsValue(JSON.parse(value))
        form.setFieldValue('graduation_time', dayjs(JSON.parse(value).graduation_time))
        setFileList([
          {
            uid: JSON.parse(value)._id,
            name: 'backImg',
            status: 'done',
            url: `https://${JSON.parse(value).avatar}`,
          },
        ])
      }
    }
  }, [])

  return (
    <div className="info-container">
      <div className="info-content">
        {!has_person_info ? (
          <div className="info-title">
            欢迎进入<span style={{ color: '#1880FF' }}>九剑考试测评系统</span>
          </div>
        ) : (
          <div className="info-title">
            修改<span style={{ color: '#1880FF' }}>个人信息</span>
          </div>
        )}

        <Form form={form} labelCol={{ style: { width: 80 } }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={onFinish} onFinishFailed={onFinishFailed} labelAlign="left">
          <Form.Item label="头像" valuePropName="fileList">
            <Upload listType="picture-card" fileList={fileList} maxCount={1} onChange={handleUploadChange}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="花名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入花名',
              },
            ]}
          >
            <Input placeholder="请输入花名" />
          </Form.Item>

          <Form.Item
            label="当前薪资"
            name="money"
            rules={[
              {
                required: true,
                message: '请输入当前薪资',
              },
            ]}
          >
            <Input placeholder="请输入当前薪资" />
          </Form.Item>

          <Form.Item
            label="技术栈"
            name="tech_stack"
            rules={[
              {
                required: true,
                message: '请输入技术栈',
              },
            ]}
          >
            <Input placeholder="请输入技术栈" />
          </Form.Item>

          <Form.Item
            label="学历"
            name="education"
            rules={[
              {
                required: true,
                message: '请选择学历',
              },
            ]}
          >
            <Select
              placeholder="请选择学历"
              options={OPTIONS.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="毕业时间"
            name="graduation_time"
            rules={[
              {
                required: true,
                message: '请选择毕业时间',
              },
            ]}
          >
            <DatePicker placeholder="请选择毕业时间" locale={locale} />
          </Form.Item>

          <Form.Item
            label="微信号"
            name="vChat"
            rules={[
              {
                required: true,
                message: '请输入微信号',
              },
            ]}
          >
            <Input placeholder="请输入微信号" />
          </Form.Item>

          <Form.Item>
            <div className="btn-container">
              {!has_person_info ? (
                <Button type="primary" htmlType="submit" className="btn goto_exam">
                  前往考试
                </Button>
              ) : (
                <>
                  <Button type="primary" htmlType="submit" className="btn">
                    确认修改
                  </Button>
                  <Button type="default" className="btn gray-btn" onClick={() => Navigate(routersData['exam_history'].path)}>
                    返回考试
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
      <img src={IMG} />
    </div>
  )
}
