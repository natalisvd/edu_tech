import { forwardRef } from 'react'
import { LEVELS } from '@/utils/levelsEnum'

export type Ref = HTMLSelectElement

interface  SelectProps {
  defaultValue: string
}

export const SelectLevel = forwardRef<Ref, SelectProps>(({ defaultValue, ...rest }, ref) => {
  return (
    <select className='select select-bordered w-full' ref={ref} {...rest}>
      <option disabled value={defaultValue}>
        Choose level
      </option>
      {LEVELS.map((level) => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>
  )
})
