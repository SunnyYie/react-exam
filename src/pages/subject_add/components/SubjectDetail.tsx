import { useEffect, useState } from 'react'
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { Button, Form, Input, message } from 'antd'
import { get_topic_two_list, select_active_topic, select_active_two, set_subject_active_two, set_subject_active_topic } from '@/store/subject'
import { useAppDispatch, useAppSelector } from '@/store'
import CustomUpload from './CustomUpload'
import { upload_imgs } from '../../../utils/uploadImages'
import { TopicType } from '@/apis/request'

export default function TopicDetail() {
  const dispatch = useAppDispatch()
  const currentlesson = useAppSelector(select_active_two)
  const currentTopic = useAppSelector(select_active_topic)

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleImgChange: UploadProps['onChange'] = async (fileInfo: UploadChangeParam) => {
    setFileList(fileInfo.fileList.map((item) => ({ ...item, status: 'done' })))
  }

  const submit = async (data: TopicType) => {
    setLoading(true)

    if (fileList.length) {
      const needUploadImgs = fileList.filter((file) => !file.url)
      if (needUploadImgs.length) {
        const imgURLs = (await upload_imgs(fileList)) as string[]
        data.img = imgURLs
      }
    } else {
      data.img = []
    }

    // 判断是编辑还是新增
    try {
      if (currentTopic) {
        // await request.patch(`/api/topic/${currentTopic._id}`, {
        //   title: data.title,
        //   dec: data.dec,
        //   img: data.img,
        // })
      } else {
        // await request.post(`/api/topic`, { ...data, two_id: currentlesson!.value })

        reset()
      }

      // 重新获取题目列表
      dispatch(get_topic_two_list(currentlesson!.value))
      message.success('操作成功')
    } catch {
      message.error('操作失败')
    } finally {
      setLoading(false)
    }
  }

  // 重置表单
  const reset = () => {
    form.resetFields()
    setFileList([])
  }

  useEffect(() => {
    if (!currentTopic) {
      reset()
    } else {
      form.setFieldsValue(currentTopic)
      if (currentTopic.img?.length) {
        setFileList(
          currentTopic.img.map((url) => {
            const fileName = url.split('/').at(-1)!
            return {
              uid: fileName,
              name: fileName,
              status: 'done',
              url: '//' + url,
            }
          }),
        )
      } else {
        setFileList([])
      }
    }
  }, [currentTopic?._id])

  useEffect(() => {
    return () => {
      dispatch(set_subject_active_two(null))
      dispatch(set_subject_active_topic(null))
    }
  }, [])

  return (
    <Form form={form} autoComplete="off" name="subject-detail-form" labelCol={{ span: 2 }} scrollToFirstError onFinish={submit}>
      <Form.Item<TopicType> label="题干" name="title" rules={[{ required: true, message: '题干必填' }]}>
        <Input />
      </Form.Item>
      <Form.Item<TopicType> label="描述" name="dec">
        <Input.TextArea />
      </Form.Item>
      <Form.Item<TopicType> label="图片" name="img">
        <CustomUpload
          fileList={fileList}
          uploadProps={{
            onChange: handleImgChange,
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button disabled={loading || !currentlesson?.value} type="primary" htmlType="submit">
          保存题目
        </Button>
      </Form.Item>
    </Form>
  )
}
