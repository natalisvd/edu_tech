'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(prevState: any, formData: FormData) {
  // TODO: add validation form fields here
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const remember = formData.get('remember')
  console.log(remember)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      message: error?.message || 'Failed to login. Try again later.'
    }
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
