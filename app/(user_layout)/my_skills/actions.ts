"use server"

import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getUserSkills = async (userId?: string) => {
  const { data: skill_to_user, error } = await supabase
  .from('skill_to_user')
  .select(`
    *,
    skill (
      id
    )
  `)
  .eq('user_id', userId)

  if (error) {
    console.log('getUserSkills [error]', error)
    throw error
  }
  console.log('skill_to_user', skill_to_user)
  return skill_to_user
}
