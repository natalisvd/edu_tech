import { forwardRef } from 'react'
import { Skills } from '../types'

interface SelectSkillProps {
  skillsList: Skills
  defaultValue: number
}
export type Ref = HTMLSelectElement

export const SelectSkill = forwardRef<Ref, SelectSkillProps>(({ defaultValue, skillsList, ...rest }, ref) => {
  return (
    <select className='select select-bordered w-full' ref={ref} {...rest}>
      <option disabled value={defaultValue}>
        Choose skill
      </option>
      {skillsList.map((skill) => (
        <option key={skill.id} value={skill.id}>{skill.skill_name}</option>
      ))}
    </select>
  )
})
