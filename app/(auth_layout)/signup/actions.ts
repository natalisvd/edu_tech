'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function signUp(formData: FormData) {

  const supabase = createClient()
  console.log("hi")
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('error', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/confirm')
}
