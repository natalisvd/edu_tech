import { createClient } from '@/utils/supabase/server'
import { getSkillsList, getUserSkills } from './actions'
import { redirect } from 'next/navigation'
import { SkillsToUser } from './types'
import { AddNewSkill } from './AddNewSkill'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login");
  }

  const userSkills: SkillsToUser = await getUserSkills(user.id)
  const skillsList = await getSkillsList()
  // console.log('userSkills', userSkills)

  return (
    <div className='container p-3'>
      <h1 className='text-3xl font-semibold leading-loose mb-8'>My Skills</h1>
      <div className='grid grid-flow-row gap-5'>
        <label className='label'>
          User skills:
          <CurrentSkills skills={userSkills}/>
        </label>
        <label className='label'>
          Add new skill:
          <AddNewSkill skillsList={skillsList} />
        </label>
      </div>
    </div>
  )
}

export const CurrentSkills = ({skills}: {skills: SkillsToUser }) => {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>{skill.skill_id}</li>
      ))}
    </ul>
  )
}
