import { createClient } from '@/utils/supabase/server'
import { getSkillsList, getUserSkills } from './actions'
import { redirect } from 'next/navigation'
import { SkillsToUser } from './types'
import { AddSkillModal } from './AddSkillModal'

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
        <h2 className='label label-text text-lg'>My current skills list:</h2>
        <CurrentSkills skills={userSkills} />
        <label className='label'>
          Add new skill:
          {/* ToDo: utilize it for edit skill too */}
          <AddSkillModal skillsList={skillsList} />
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
