import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import QuestionList from './components/questionList'
import QuestionContent from './components/questionContent'
import { Question } from './components/type'
import { Spin } from 'antd'

export default function ReadExam() {
  const list = [
    {
      id: 1,
      questionId: 'question_broswer',
      name: '1、请简要描述浏览器渲染原理',
      state: true,
      stem: '1、请简要描述浏览器渲染原理？',
      describe: '这是考题描述这是考题描述这是考题描述,这是考题描述这是考题描述这是考题描述,这是考题描述这是考题描述',
      answer: '这是考题答案',
      comment: '这是考题评语',
      image: 'https://img1.baidu.com/it/u=3788862810,580260930&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=663',
    },
    {
      id: 2,
      questionId: 'question_equal',
      name: '2、react和vue的区别？',
      state: false,
      stem: '2、react和vue的区别？',
      describe: '这是考题描述',
      image: '',
      answer: '这是考题答案',
      comment: '这是考题评语',
    },
    {
      id: 3,
      questionId: 'question_strict_mode',
      name: '3、JavaScript 中“严格模式”的目的是什么？',
      state: true,
      stem: '3、 JavaScript 中“严格模式”的目的是什么？',
      describe: '这是考题描述',
      image: '',
      answer: '这是考题答案',
      comment: '这是考题评语',
    },
    {
      id: 4,
      questionId: 'question_instanceof',
      name: '4、intanceof 操作符的实现原理及实现？',
      state: true,
      stem: '4、 intanceof 操作符的实现原理及实现？',
      describe: '这是考题描述',
      image: '',
      answer: '这是考题答案',
      comment: '这是考题评语',
    },
  ]
  const question = useState<Question[]>(list)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    // 进入页面初始化数据

    return () => {
      // 离开页面清除数据
    }
  }, [])

  return (
    <div className={styles.question}>
      <div className={styles.question_list}>
        <QuestionList
          list={question}
          currentQuestion={currentQuestion}
          onChange={(id: number) => {
            setCurrentQuestion(id)
          }}
        />
      </div>

      <div className={styles.question_content}>
        <QuestionContent list={question} />
      </div>
    </div>
  )
}
