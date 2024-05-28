import { createClient } from '@/utils/supabase/server'
import { getUserSkills } from './actions'
import { redirect } from 'next/navigation'

interface SkillToUser {
  id?: string
  created_at?: string
  skill_id?: number
  user_id?: string
  lvl?: string
}

type SkillsToUser = SkillToUser[] | []

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login");
  }

  const skills: SkillsToUser = await getUserSkills(user.id)
  console.log('skills', skills)

  return (
    <div className='container p-3'>
      <h1 className='text-3xl font-semibold leading-loose mb-8'>My Skills</h1>
      <div>
        <CurrentSkills skills={skills}/>
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>{skill.skill_id}</li>
          ))}
        </ul>
        {/* <AddNewSkill /> */}
      </div>
    </div>
  )
}

export const CurrentSkills = ({skills}: {skills: SkillsToUser}) => {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>{skill.skill_id}</li>
      ))}
    </ul>
  )
}
