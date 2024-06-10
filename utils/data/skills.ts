import { cache } from 'react'
import { createClient } from '@/utils/supabase/server'


export const getSkillsList = cache(async (skillsList?: number[] | undefined) => {
  const supabase = createClient()

  let query = supabase
    .from('skill')
    .select('id, skill_name')
    
  if (skillsList?.length) {
    query = query.not('id', 'in', `(${skillsList.join(',')})`)
  }

  const { data: skills, error } = await query
  // console.log(`[skills]`, skills)

  if (error) {
    console.log('[getSkillsList] error', error)
    throw error
  }

  return skills
})
