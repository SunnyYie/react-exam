import { useEffect, useState } from 'react'
import { Button, Divider, Input, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { exam_list, set_exam, set_exam_count } from '@/store/exam'
import { useNavigate, useParams } from 'react-router-dom'
import { routersData } from '@/config'
import styles from './index.module.css'
import { findTopic } from '@/apis/topic'
import { createExam } from '@/apis/exam'

function Exam() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const routerParams = useParams()
  const current_exam_id = routerParams.exam_id || ''

  // 获取考题列表
  const examlist = useAppSelector(exam_list)
  const [selectExamList, setSelectExamList] = useState<Array<any>>([])
  // 记录当前答题的题号
  let [currentQuestion, setCurrentQuestion] = useState<number>(0)
  // 将答案存储在本地，初始化从本地获取
  const rawValue = window.localStorage.getItem('topic_list')
  const initializeanswer = rawValue ? JSON.parse(rawValue) : []
  const [answer, setAnswer] = useState<Array<string>>(initializeanswer)

  //切换tab
  const handleClick = (index: number) => {
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

    window.localStorage.setItem('topic_list', JSON.stringify(answer))
  }

  const finishHandle = async () => {
    const isFinish = selectExamList.every((item: any) => item.isKeep)
    if (isFinish) {
      let data = window.localStorage.getItem('topic_list') || '[]'
      // 提交答案
      const res = await createExam({ topic_list: JSON.parse(data), two_id: current_exam_id })
      message.success('提交成功!')

      window.localStorage.removeItem('topic_list')

      navigate({
        pathname: routersData.exam_history.path,
      })
    } else {
      message.error('未答完!')
    }
  }

  const goback = () => {
    // 清空保存的答案
    window.localStorage.removeItem('topic_list')
    navigate({ pathname: `/exam_select` })
  }

  useEffect(() => {
    if (examlist) {
      setSelectExamList(examlist)
    }
  }, [examlist])

  useEffect(() => {
    // 根据two_id去获取考试题目
    const getExamList = async () => {
      const res = await findTopic(current_exam_id)

      const arr = res.data.data.map((item: any, index: number) => {
        const rawValue = window.localStorage.getItem('topic_list')

        return {
          ...item,
          isKeep: rawValue ? rawValue[index] : false,
        }
      })

      dispatch(set_exam(arr))
      dispatch(set_exam_count(res.data.data.length))
    }

    getExamList()
  }, [])

  return (
    <>
      {selectExamList?.length && selectExamList?.length === 0 ? (
        <div>loading</div>
      ) : (
        <div className={styles.exam}>
          <div className={styles.exam_left}>
            <div className={styles.title}> 考题列表</div>
            <div className={styles.exam_left_content}></div>
            {selectExamList?.map((item: any, index: number) => {
              return (
                <div key={index} className={`${styles.questiontab}`} onClick={() => handleClick(index)}>
                  <div className={`${styles.question} ${currentQuestion === index ? styles.alreadyselect : ''}`}>
                    {index + 1}、{item.title}
                  </div>
                  <div className={`${styles.circle}  ${selectExamList[index].isKeep ? styles.alreadykeep : ''}`}></div>
                </div>
              )
            })}
          </div>

          <div className={styles.exam_right}>
            <div className={styles.exam_right_marigin}>
              <div className={styles.exam_right_top}>
                <div className={`${styles.title} ${styles.rightTitle} `}>题目详情</div>
                <Button type="primary" className={styles.customButton} onClick={() => goback()}>
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

              <p className={styles.exam_right_question}>
                {currentQuestion + 1}、{selectExamList[currentQuestion]?.title}
              </p>
              <p className={styles.exam_right_desc}>{selectExamList[currentQuestion]?.dec}</p>
              <div className={styles.exam_right_pic} style={{ backgroundImage: selectExamList[currentQuestion]?.img[0] }}></div>
            </div>

            <Divider />
            <div className={styles.exam_right_marigin}>
              <div className={`${styles.title}`}>作答区域</div>
              <Input.TextArea value={answer[currentQuestion]} rows={4} placeholder="请输入多行文本" className={styles.customInput} onChange={(e) => handleTextChange(e.target.value)} />
              <div className={styles.exam_right_btn}>
                <Button type="primary" className={styles.keepbtn} onClick={() => handleKeepAnswer(currentQuestion)}>
                  保存作答
                </Button>
                <Button type="primary" className={styles.summitbtn} onClick={() => finishHandle()}>
                  点击交卷
                </Button>
              </div>
              <div className={styles.exam_right_tip}>tips:</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Exam
