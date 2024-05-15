import { useEffect, useState } from 'react'
import { Button, Divider, Input, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { exam_list, exam_topic_list, set_exam, set_exam_count, set_exam_topic_list } from '@/store/exam'
import { useLocation } from 'react-router'
import styles from './index.module.css'
import { enterExam } from '@/apis/exam'
import { findTopic } from '@/apis/topic'

export default function CorretExam() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  // 获取考题列表
  const examlist = useAppSelector(exam_list)
  const answerList = useAppSelector(exam_topic_list)
  const [selectExamList, setSelectExamList] = useState<Array<any>>([])
  // 记录当前答题的题号
  let [currentQuestion, setCurrentQuestion] = useState<number>(0)
  // 将答案存储在本地，初始化从本地获取
  const rawValue = window.localStorage.getItem('topic_list')
  const initializeanswer = rawValue ? JSON.parse(rawValue) : []
  const [answer, setAnswer] = useState<Array<string>>(initializeanswer)

  let handleClick = (index: number) => {
    setCurrentQuestion(index)
  }

  const handleTextChange = (value: string) => {
    let newanswer = [...answer]
    newanswer[currentQuestion] = value
    setAnswer(newanswer)
  }

  const handleKeepAnswer = (index: number) => {
    if (!answer[index]) {
      alert('未作答')
      return
    }

    let newSelct = [...selectExamList]
    newSelct[index] = { ...newSelct[index], isKeep: true }
    setSelectExamList(newSelct)

    if (index != examlist.length - 1) {
      setCurrentQuestion(index + 1)
    }
  }

  const finishHandle = () => {
    const isFinish = selectExamList.every((item: any) => item.isKeep)
    if (isFinish) {
      // 提交答案
      // examPost(createExamSubmitBody({ topic_list: JSON.parse(data), two_id: current_exam_id })).then(() => {
      //   message.success('提交成功!')
      //   navigate({
      //     pathname: routersData.exam_history.path,
      //   })
      // })
    } else {
      message.error('未答完!')
    }
  }

  useEffect(() => {
    if (examlist) {
      setSelectExamList(examlist)
    }
  }, [examlist])

  useEffect(() => {
    const id = location.pathname.split('/')[2]

    const getExamAnswer = async () => {
      const res = await findTopic(id.split('%20')[0])
      console.log(res.data.data)
      dispatch(set_exam(res.data.data))
      dispatch(set_exam_count(res.data.data.length))
    }
    const getAnswerList = async () => {
      const res = await enterExam(id.split('%20')[1])
      console.log(res.data.data)
      dispatch(set_exam_topic_list(res.data.data.topic_list))
    }
    getExamAnswer()
    getAnswerList()
    // dispatch(get_exam(id))
  }, [])

  //按钮样式
  return (
    <div className={styles.exam}>
      {/* 左边 */}
      <div className={styles.exam_left}>
        <div className={styles.title}> 考题列表</div>
        <div className={styles.exam_left_content}></div>
        {selectExamList.map((item, index) => {
          return (
            <div key={index} className={`${styles.questiontab}`} style={{ cursor: 'pointer' }} onClick={() => handleClick(index)}>
              <div className={`${styles.question} ${currentQuestion === index ? styles.alreadyselect : ''}`}>
                {index + 1}、{item.title}
              </div>
              <div className={`${styles.circle}  ${selectExamList[index].isKeep ? styles.alreadykeep : ''}`}></div>
            </div>
          )
        })}
      </div>

      {/* 右边 */}
      <div className={styles.exam_right}>
        {/* 题目栏 */}
        <div className={styles.exam_right_marigin}>
          <div className={styles.exam_right_top}>
            <div className={`${styles.title} ${styles.rightTitle} `}>题目详情</div>
            <Button type="primary" className={styles.customButton}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="16" height="14" viewBox="0 0 16.26045036315918 14.969650268554688" className={styles.customButtonSvg}>
                <g>
                  <path
                    d="M11.2538,14.8447L11.2538,14.9697L1.2538,14.9697L1.2538,13.7197L10.0038,13.7197C12.7652,13.7197,15.0038,11.4811,15.0038,8.71965C15.0038,5.95823,12.7652,3.71965,10.0038,3.71965L5.0038,3.71965L5.0038,5.71965C4.98964,6.00358,4.74908,6.22293,4.46505,6.2109C4.3531,6.2114,4.24351,6.17878,4.15005,6.11715L0.225051,3.5034C-0.0147762,3.35838,-0.0733799,3.03606,0.100051,2.8159C0.135684,2.77325,0.177878,2.73654,0.225051,2.70715L4.15005,0.0946493C4.39131,-0.0651976,4.71413,-0.0183882,4.90005,0.203399C4.96675,0.285374,5.00337,0.387718,5.0038,0.493399L5.0038,2.46965L10.0038,2.46965C13.2148,2.46642,15.9058,4.89682,16.2285,8.09153C16.5511,11.2862,14.4005,14.2057,11.2538,14.8447Z"
                    fill="#FFFFFF"
                    fillOpacity="1"
                  />
                </g>
              </svg>
              返回
            </Button>
          </div>
          <p className={styles.exam_right_question}>问题{selectExamList[currentQuestion]?.title}</p>
          <p className={styles.exam_right_desc}>题目表述</p>
          <div className={styles.exam_right_pic}>这里再表述一下</div>
        </div>
        <Divider />
        <div className={`${styles.answer_title}`}>
          考试答案:<div className={`${styles.answer}`}>{answerList[currentQuestion]}</div>
        </div>
        {/* 批阅栏 */}
        <div className={styles.exam_right_marigin}>
          <div className={`${styles.title}`}>我的批阅</div>

          <Input.TextArea value={answer[currentQuestion]} rows={4} placeholder="请输入多行文本" className={styles.customInput} onChange={(e) => handleTextChange(e.target.value)} />
          <div className={styles.exam_right_btn}>
            <Button type="primary" className={styles.keepbtn1} onClick={() => handleKeepAnswer(currentQuestion)}>
              合格
            </Button>
            <Button type="primary" className={styles.keepbtn2} onClick={() => handleKeepAnswer(currentQuestion)}>
              不合格
            </Button>
            <Button type="primary" className={styles.summitbtn} onClick={() => finishHandle()}>
              完成批改
            </Button>
          </div>
          <div className={styles.exam_right_tip}>注意:</div>
        </div>
      </div>
    </div>
  )
}
