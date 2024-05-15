import { ReactNode, useEffect } from 'react'
import { TreeSelect, Button, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
import { get_subject_tree_async, get_topic_two_list, select_active_topic, select_active_two, select_subject_tree, set_subject_active_topic, set_subject_active_two } from '@/store/subject'
import SubjectList from './components/SubjectList'
import SubjectDetail from './components/SubjectDetail'
import styles from './index.module.scss'
import './index.scss'

function SubjectAdd() {
  const dispatch: AppDispatch = useDispatch()
  // 选课数据和当前选中的课程
  const treeData = useSelector(select_subject_tree)
  const activeTwo = useSelector(select_active_two)
  // 当前选中的题目
  const currentTopic = useSelector(select_active_topic)

  // 切换课程
  function handleLessonChange(value: string, nameArr: ReactNode[]) {
    dispatch(
      set_subject_active_two({
        title: nameArr[0],
        value,
      }),
    )
    dispatch(set_subject_active_topic(null))
  }

  useEffect(() => {
    dispatch(get_subject_tree_async())
  }, [])

  useEffect(() => {
    if (!activeTwo?.value) return
    dispatch(get_topic_two_list(activeTwo?.value))
  }, [activeTwo?.value])

  return (
    <div className={styles.wrap}>
      <div className="title-bar">
        <p className="title">{activeTwo?.title}</p>
        <div className="lesson-select">
          <TreeSelect popupClassName={'subject-add-tree-select'} style={{ width: 320 }} treeDefaultExpandAll treeData={treeData} value={activeTwo?.value} onChange={handleLessonChange} />
          <Button
            type="primary"
            onClick={() => {
              dispatch(set_subject_active_topic(null))
            }}
          >
            新增题目
          </Button>
        </div>
      </div>

      <div className="content">
        <div className="left">
          <SubjectList />
        </div>
        <div className="right">
          <p className="title">题目详情{currentTopic ? <Tag color="orange">编辑</Tag> : <Tag color="blue">新增</Tag>}</p>
          <SubjectDetail />
        </div>
      </div>
    </div>
  )
}

export default SubjectAdd
