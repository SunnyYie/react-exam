import Mock from 'mockjs'

Mock.mock('/api/user/menu', 'get', () => {
  return {
    code: 0,
    msg: 'ok',
    data: [
      {
        label: '考题选择',
        key: 'exam_select',
        path: '/exam_select',
        hasMenu: true,
      },
      {
        label: '考试记录',
        key: 'exam_history',
        path: '/exam_history',
        hasMenu: true,
      },
    ],
  }
})

Mock.mock('/api/user/login', 'post', (req) => {
  let role = ''

  if (JSON.parse(req.body).code === '111111') {
    role = 'student'
  } else if (JSON.parse(req.body).code === '222222') {
    role = 'admin'
  }
  if (JSON.parse(req.body).code === '333333') {
    role = 'super_admin'
  }

  return {
    code: 0,
    msg: 'ok',
    data: {
      role: role,
      has_person_info: req.body.phone === '15326515951',
      _id: '007',
      phone: '15326515951',
      img: 'xxxx',
      created: '2001-08-17',
      name: 'sunny  ',
    },
  }
})

Mock.mock(/\/api\/user\/\d+/, 'patch', (req) => {
  const id = (req.url.match(/\/api\/user\/(\d+)/) as any)[1]

  return {
    code: 0,
    msg: 'ok',
    data: {
      id: id,
    },
  }
})
