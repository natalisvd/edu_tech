import { cache } from 'react'
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getSkillsList = cache(async () => {
  const { data: skills, error } = await supabase
  .from('skill')
  .select(`*`)
  if (error) throw error

  return skills
})
