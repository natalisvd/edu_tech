import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { UserSkills } from './types'
import { AddSkillModal } from './AddSkillModal'
import { getSkillsList } from '@/utils/data/skills'
import { CurrentSkills } from './CurrentSkills'

const supabase = createClient()

export const getUserSkills = async (userId?: string) => {
  const { data: skill_to_user, error } = await supabase
  .from('skill_to_user')
  .select(`
    id,
    skill_id,
    lvl,
    skill (
      id, skill_name
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: true })

  if (error) {
    console.log('getUserSkills [error]', error)
    throw error
  }
  return skill_to_user as UserSkills
}

export default async function MySkills() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login");
  }

  const userSkills: UserSkills = await getUserSkills(user.id)
  const filterUserSkills = userSkills.map(skill => skill?.skill_id).filter((item): item is number => !!item)
  const skillsList = await getSkillsList(filterUserSkills)

  return (
    <div className='container p-3'>
      <h1 className='text-3xl font-semibold leading-loose mb-8'>Skills</h1>
      <div className='grid grid-flow-row gap-5 max-w-xl'>
        <h2 className='label-text select-none underline text-lg'>My current skills list:</h2>
        <CurrentSkills skills={userSkills} />
        <div className='w-52'>
          <AddSkillModal skillsList={skillsList} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
