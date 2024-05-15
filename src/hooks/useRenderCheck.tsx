import { useRef } from 'react'

export default function useRenderCheck(name: string) {
  const ref = useRef(0)

  ref.current += 1

  console.log(`Render ${name} ${ref.current}`)
}
