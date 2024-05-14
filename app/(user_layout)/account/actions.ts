"use server"

import { createClient } from "@/utils/supabase/server"
import { AccountFormValues as FormValues } from "./types"

const supabase = createClient()

export const getProfileData = () => {

}

export async function updateProfilefromServer (data: FormValues) {
  const user = (await supabase.auth.getUser()).data.user

  const { error } = await supabase.from('profiles').upsert({
    id: user?.id as string,
    updated_at: new Date().toISOString(),
    username: data?.username || null,
    first_name: data?.firstname || null,
    last_name: data?.lastname || null,
    avatar_url: data?.avatar_url || null
  })

  if (error) {
    console.log('[error]', error)
  }

  return { message: 'Profile updated!', severity: 'success' }
}