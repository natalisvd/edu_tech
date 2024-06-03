import { createClient } from '@/utils/supabase/server'
import { getUserSkills } from './actions'
import { redirect } from 'next/navigation'
import { SkillsToUser } from './types'
import { AddSkillModal } from './AddSkillModal'
import { getSkillsList } from '@/utils/data/skills'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login");
  }

  const userSkills: SkillsToUser = await getUserSkills(user.id)
  const filterUserSkills = userSkills.map(skill => skill?.skill_id).filter((item): item is number => !!item)
  const skillsList = await getSkillsList(filterUserSkills)
  // console.log('filterUserSkills', filterUserSkills)

  return (
    <div className='container p-3'>
      <h1 className='text-3xl font-semibold leading-loose mb-8'>My Skills</h1>
      <div className='grid grid-flow-row gap-5'>
        <h2 className='label label-text text-lg'>My current skills list:</h2>
        <CurrentSkills skills={userSkills}/>
        <div className='label'>
          Add new skill:
          {/* ToDo: utilize it for edit skill too */}
          <AddSkillModal skillsList={skillsList} userId={user.id} />
        </div>
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
