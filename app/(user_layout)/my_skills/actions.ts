"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { UpdateSkillProps } from "./types"

const supabase = createClient()

export const addNewUserSkill = async ({ userId, skill, level, approved = false }: UpdateSkillProps) => {
  const { error } = await supabase
    .from('skill_to_user')
    .upsert({ 
      user_id: userId,	
      skill_id: skill,	
      lvl: level,	
      approved
    })

  if (error) {
    console.log('addNewUserSkill [error]', error)
    throw error
  }

  revalidatePath('/my_skills', 'page')
}

export const updateUserSkillLevel = async ({ id, level }: { id: string, level: string }) => {
  const { error } = await supabase
    .from('skill_to_user')
    .update({
      lvl: level,
    })
    .eq('id', id )

  if (error) {
    console.log('updateUserSkillLevel [error]', error)
    throw error
  }

  revalidatePath('/my_skills', 'page')
}

export const deleteSkillbyId = async ({ id }: { id: string }) => {
  const { error } = await supabase
    .from('skill_to_user')
    .delete()
    .eq('id', id)

  if (error) {
    console.log('deleteSkillbyId [error]', error, id)
    throw error
  }

  revalidatePath('/my_skills', 'page')
}
