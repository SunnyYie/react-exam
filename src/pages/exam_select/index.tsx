import styles from './index.module.scss'
import { useEffect, useRef } from 'react'
import React from 'react'
import classnames from 'classnames'
import { exam_select_data, set_exam_select_data, set_subject_tree } from '@/store/subject'
import colorsData from './color.json'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/index'
import { useNavigate } from 'react-router-dom'
import { getSubjects } from '@/apis/subject'
import { createExam } from '@/apis/exam'

type ResData = {
  _id: string
  title: string
  value: string
  img: string
  color: string
  children: {
    title: string
    value: string
    can_exam: boolean
    ispermission?: boolean
    isChecked?: boolean
    topic_list: []
  }[]
}

function ExamSelect() {
  let topic_id = useRef<ResData['children'][number] | null>(null)
  const data = useSelector(exam_select_data) as ResData[]
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleChoose = (item: ResData['children'][number]) => {
    if (item.can_exam) {
      topic_id.current = item

      const checked_data = data.map((t) => {
        const updated_data = t.children.map((dataItem) => (dataItem.value === item.value ? { ...dataItem, isChecked: true } : { ...dataItem, isChecked: false }))
        return { ...t, children: updated_data }
      })

      dispatch(set_exam_select_data(checked_data))
    }
  }

  const handleJump = async () => {
    if (!topic_id.current) {
      alert('请选择题目再作答')
    } else {
      // let indexList: any = []
      // data.forEach((item, index) => {
      //   item.children.forEach((_item, _index) => {
      //     if (_item.value === topic_id.current?.value) {
      //       indexList.push(index)
      //       indexList.push(_index)
      //     }
      //   })
      // })

      // // 创建考试
      // const res = await createExam({
      //   two_id: topic_id.current.value,
      //   topic_list: data[indexList[0]].children[indexList[1]].topic_list,
      // })

      navigate({
        pathname: `/exam/${topic_id.current.value}`,
      })
    }
  }

  useEffect(() => {
    const getAllSubject = async () => {
      const res = await getSubjects()

      dispatch(set_exam_select_data(res.data.data))
    }
    getAllSubject()
  }, [])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div>
            {data.map((item: (typeof data)[number], index) => (
              <React.Fragment key={item.title}>
                <div
                  style={{
                    color: colorsData.colors[index % colorsData.colors.length].value,
                  }}
                  className={styles.title}
                >
                  <div>{item.title}</div>
                </div>
                <div className={styles.topic_section}>
                  {item.children.map((_item: (typeof data)[number]['children'][number]) => (
                    <div
                      key={_item.value}
                      className={classnames(styles.topic_section_content, {
                        topic_section_content_selected: _item.isChecked && _item.can_exam === true,
                        topic_section_content_disabled: _item.can_exam === false,
                      })}
                      onClick={() => handleChoose(_item)}
                    >
                      <p>{_item.title}</p>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleJump}>开始答题</button>
        </div>
      </div>
    </>
  )
}

export default ExamSelect
