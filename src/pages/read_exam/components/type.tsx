export interface Question {
  id: number
  questionId: string
  name: string
  state: boolean
  stem: string
  describe: string
  image?: string
  answer: string
  comment: string
}
