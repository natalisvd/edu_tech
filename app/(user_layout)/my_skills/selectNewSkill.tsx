import { forwardRef } from 'react'
import { Skills } from './types'

interface SelectSkillProps {
  skillsList: Skills
}
export type Ref = HTMLSelectElement

export const SelectSkill = forwardRef<Ref, SelectSkillProps>(({ skillsList, ...rest }, ref) => {
  return (
    <select className='select select-bordered w-full max-w-xs' ref={ref} {...rest}>
      <option disabled value={0}>
        Choose
      </option>
      {skillsList.map((skill) => (
        <option key={skill.id} value={skill.id}>{skill.skill_name}</option>
      ))}
    </select>
  )
})
