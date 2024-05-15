import Mock from 'mockjs'

Mock.mock('/api/subject', 'get', () => {
  return {
    code: 0,
    msg: 'ok',
    data: [
      {
        title: 'react',
        value: 'react',
        children: [
          {
            title: '21天',
            value: '521',
            can_exam: true,
          },
          {
            title: '45天',
            value: '545',
            can_exam: false,
          },
        ],
      },
      {
        title: 'vue',
        value: 'vue',
        children: [
          {
            title: '深入浅出Vue',
            value: '520',
            can_exam: true,
          },
        ],
      },
    ],
  }
})

Mock.mock(/\/api\/topic\/\d+/, 'get', (req) => {
  return {
    code: 0,
    msg: 'ok',
    data: [
      {
        exam: [
          {
            dec: '题目1',
            title: '题目1',
            two_id: '521',
            _id: '1',
            img: [],
          },
          {
            dec: '题目2',
            title: '题目2',
            two_id: '520',
            _id: '2',
            img: [],
          },
        ],
        count: 2,
      },
    ],
  }
})

Mock.mock('/api/exam', 'get', () => {
  return {
    code: 0,
    msg: 'ok',
    data: [
      {
        _id: '520',
        created: '2024-01-01T17:07:01.084Z',
        subject_name: '21React',
        user_name: 'sxc',
        is_judge: false,
        topic_list: [
          {
            _id: '1',
            title: '题目1',
            dec: '题目1',
            img: [],
            two_id: '11',
            answer: 'sxc',
          },
          {
            _id: '2',
            title: '题目2',
            dec: '题目2',
            img: [],
            two_id: '22',
            answer: 'xxy',
          },
        ],
      },
      {
        _id: '521',
        created: '2024-02-01T17:07:01.084Z',
        subject_name: 'Vue',
        user_name: 'sxc',
        is_judge: true,
        topic_list: [
          {
            _id: '1',
            title: '题目1',
            dec: '题目1',
            img: [],
            two_id: '11',
            answer: 'sxc',
          },
          {
            _id: '2',
            title: '题目2',
            dec: '题目2',
            img: [],
            two_id: '22',
            answer: 'xxy',
          },
        ],
      },
    ],
  }
})
