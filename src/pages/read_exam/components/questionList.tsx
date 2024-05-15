import success from '../assets/success.png'
import error from '../assets/error.png'
import styles from './questionList.module.scss'
import { Question } from './type'

export default function QuestionList(props: { list: any; currentQuestion: number; onChange: any }) {
  function handleClick(questionId: string, index: number) {
    props.onChange(index)
    window.location.hash = questionId
  }
  const { list, currentQuestion } = props

  return (
    <>
      <div className={styles.title}>考题列表</div>
      <div className={`${styles.list}  ${styles.scroll}`}>
        {list[0].map((item: Question, index: number) => (
          <div
            key={item.id}
            onClick={() => {
              handleClick(item.questionId, index)
            }}
            className={styles.list_item}
          >
            <div className={`${styles.question} ${currentQuestion === index ? styles.alreadyselect : ''}`}>{item.name}</div>

            {item.state && <img src={success} className={styles.right} alt="" />}
            {!item.state && <img src={error} className={styles.right} alt="" />}
          </div>
        ))}
      </div>
    </>
  )
}
