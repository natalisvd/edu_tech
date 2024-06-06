"use server"

import { createClient } from "@/utils/supabase/server"
import { AccountFormValues as FormValues } from "./types"

const supabase = createClient()

export const getProfileData = async (userId?: string) => {
  const { data, error, status } = await supabase
  .from('profiles')
  .select(`first_name, last_name, username, avatar_url`)
  .eq('id', userId)
  .single()

  if (error && status !== 406) {
    console.log(error)
    throw error
  }
  return data
}

export async function updateProfileData (userId: string, data: FormValues) {
  const { error } = await supabase.from('profiles').upsert({
    id: userId as string,
    first_name: data.firstname,
    last_name: data.lastname,
    username: data.username,
    avatar_url: data.avatar_url,
    updated_at: new Date().toISOString(),
  })
  if (error) {
    throw error
  }
}
