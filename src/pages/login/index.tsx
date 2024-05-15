import { login_desc, login_logo, login_title_cn, login_title_en } from './assets/index'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import axios from '@/apis/service'
import style from './index.module.scss'
import { AxiosRes } from '@/apis/request'
import { login, RoleParams } from '@/apis/user'
import { set_userInfo } from '@/store/resetUser'

const COUNT = 60

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [count, set_count] = useState(0)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  // 发送验证码
  const startCode = () => {
    if (count !== 0) return
    form
      .validateFields(['phone'])
      .then(() => {
        set_count(COUNT)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 表单验证失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onLogin = async (values: RoleParams) => {
    const res: AxiosRes = (await login(values)) as any

    if (res.data.code !== 0) return messageApi.warning(res.data.msg)

    dispatch(set_userInfo(res.data.data))

    // 根据用户权限跳转至不同的页面
    switch (res.data.data.role) {
      case 'student':
        if (res.data.data.has_person_info) {
          navigate('/exam_select')
        } else {
          navigate('/person_info')
        }
        break
      case 'admin':
        navigate('/corret_exam_list')
        break
      case 'super_admin':
        navigate('/corret_exam_list')
        break
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (count === 0) return
      set_count(count - 1)
    }, 1000)
  }, [count])

  return (
    <div className={style.page_container}>
      {contextHolder}
      <div className={style.login_container}>
        <div className={style.login_left}>
          <div className={style.left_title}>
            <img src={login_desc} alt="" />
          </div>
        </div>
        <div className={style.login_right}>
          <div className={style.right_title}>
            <div>
              <img src={login_logo} alt="" />
            </div>
            <div className={style.title_container}>
              <div>
                <img src={login_title_cn} alt="" />
              </div>
              <div>
                <img src={login_title_en} alt="" />
              </div>
            </div>
          </div>
          <div className={style.right_form}>
            <Form size="large" labelCol={{ span: 5 }} wrapperCol={{ span: 20 }} onFinish={onLogin} labelAlign="left" onFinishFailed={onFinishFailed} form={form}>
              <Form.Item
                label="手机号"
                name="phone"
                rules={[
                  { required: true, message: '请填写手机号' },
                  { pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, 'g'), message: '请输入正确的手机号' },
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
              <div style={{ position: 'relative' }}>
                <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input placeholder="请输入验证码" style={{ padding: '7px 100px 7px 11px' }} />
                </Form.Item>
                <div className={[style.form_code_btn, count !== 0 ? style.form_code_btn_disabled : ''].join(' ')} onClick={startCode}>
                  {count === 0 ? '获取验证码' : `${count}秒`}
                </div>
              </div>
              <div className={style.form_btn}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
