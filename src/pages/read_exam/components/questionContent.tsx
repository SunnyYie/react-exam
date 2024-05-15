import RollbackOutlined from '@ant-design/icons/RollbackOutlined'
import { Button } from 'antd'
import styles from './questionContent.module.scss'
import { Question } from './type'
import { useNavigate } from 'react-router'

export default function QuestionContent(props: { list: any }) {
  const { list } = props
  const navigator = useNavigate()

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>考卷详情</div>
        <div className={styles.back_btn}>
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            onClick={() => {
              navigator('/exam_history')
            }}
          >
            返回
          </Button>
        </div>
      </div>
      <div className={`${styles.content} + " " ${styles.scroll}`}>
        {list[0].map((item: Question) => (
          <div className={styles.content_item} key={item.id}>
            <div id={item.questionId} className={styles.question_title}>
              {item.name}
            </div>
            <div className={styles.question_describe}>{item.describe}</div>
            {item.image ? (
              <div className={styles.question_image}>
                <img src={item.image} alt={item.image} />
              </div>
            ) : null}
            <div className={styles.question_answer}>
              <div className={styles.label}>考题答案：</div>
              <div className={styles.value}>{item.answer}</div>
            </div>
            <div className={styles.question_comment}>
              <div className={styles.label}>
                <div className={styles.text}>考题评语：</div>
                <div className={[styles.state, item.state ? styles.success : styles.error].join(' ')}>{item.state ? '合格' : '不合格'}</div>
              </div>
              <div className={styles.value}>{item.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
