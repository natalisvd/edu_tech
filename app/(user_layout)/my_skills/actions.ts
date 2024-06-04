"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { UpdateSkillProps, UserSkills } from "./types"

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

  if (error) {
    console.log('getUserSkills [error]', error)
    throw error
  }
  console.log('skill_to_user', skill_to_user)
  return skill_to_user as UserSkills
}

export const updateUserSkills = async ({ userId, skill, level, approved = false }: UpdateSkillProps) => {
  const { data: updatedSkill, error } = await supabase
    .from('skill_to_user')
    .upsert({ 
      user_id: userId,	
      skill_id: skill,	
      lvl: level,	
      approved
    })
    .select()

  if (error) {
    console.log('updateUserSkills [error]', error)
    throw error
  }

  revalidatePath('/my_skills', 'page')
  console.log('updatedSkill', updatedSkill)
  return updatedSkill
}

export const updateUserSkillLevel = async ({ id, level }: { id: string, level: string }) => {
  const { data: updatedSkill, error } = await supabase
    .from('skill_to_user')
    .update({
      lvl: level,
    })
    .eq('id', id )
    .select()

  if (error) {
    console.log('updateUserSkills [error]', error)
    throw error
  }

  revalidatePath('/my_skills', 'page')
  console.log('updatedSkill', updatedSkill)
  return updatedSkill
}
