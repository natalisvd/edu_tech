import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient()

  const formData = await req.formData();
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))


  const { data, error } = await supabase
    .auth
    .signInWithPassword({
      email, password
    });
  
  if (data) console.log(data);
  
  if (error) console.log(error);

  return NextResponse.redirect('/')
}