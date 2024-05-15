

export type DataType = {
  key: React.Key
  testType: string
  testDateTime: string
  is_judge: boolean
}

export const tableDefaultData: DataType[] = [
  {
    key: '1',
    testType: 'React源码',
    testDateTime: '2023-06-15 13:45',
    is_judge: false,
  },
  {
    key: '2',
    testType: 'React源码',
    testDateTime: '2023年6月5',
    is_judge: true,
  },
]


