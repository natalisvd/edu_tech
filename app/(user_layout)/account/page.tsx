import { Suspense } from 'react'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { Loading } from './loading-form'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='container p-3'>
      <h1 className='text-3xl font-semibold leading-loose mb-8'>Account Settings</h1>
      <div className='max-w-md w-full mx-auto mb-10'>
        <Suspense fallback={<Loading />}>
          <AccountForm user={user} />
        </Suspense>
      </div>
    </div>
  )
}
