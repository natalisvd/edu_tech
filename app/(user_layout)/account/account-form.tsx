'use client'

// import { useCallback, useEffect, useState } from 'react'
// import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
// import { LogoutButton } from '../../components/LogoutButton/LogoutButton'
import { useRouter } from 'next/navigation'

export default function AccountForm({ user }: { user: User | null }) {
  const router = useRouter()
  return (
    <div className='container grid grid-flow-row gap-5'>
      <h1 className='mb-3 text-xl'>Current User</h1>
      <div className='flex flex-row gap-4'>
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <p>Confirmed:</p>
        <p>{user?.email_confirmed_at}</p>
      </div>
      <div className='flex flex-row gap-4 mb-5'>
        <p>Verified email:</p>
        <p>{user?.user_metadata?.email_verified ? 'true' : 'false'}</p>
      </div>
      {/* <LogoutButton /> */}
      <button className='btn btn-primary btn-outline mt-5 max-w-fit' onClick={() => router.push('/')}>go to Main Page</button>
    </div>
  )
  // --- ToDo:  use it when user profiles will be created in db ---

  // const supabase = createClient()
  // const [loading, setLoading] = useState(true)
  // const [firstname, setFirstname] = useState<string | null>(null)
  // const [username, setUsername] = useState<string | null>(null)
  // const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  // const getProfile = useCallback(async () => {
  //   try {
  //     setLoading(true)

  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`first_name, username, avatar_url`)
  //       .eq('id', user?.id)
  //       .single()

  //     if (error && status !== 406) {
  //       console.log(error)
  //       throw error
  //     }

  //     if (data) {
  //       setFirstname(data?.first_name || "no first_name")
  //       setUsername(data?.username || "no username")
  //       setAvatarUrl(data?.avatar_url || "no url")
  //     }
  //   } catch (error) {
  //     alert('Error loading user data!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [user, supabase])

  // useEffect(() => {
  //   getProfile()
  // }, [user, getProfile])

  // async function updateProfile({
  //   username,
  //   avatar_url,
  // }: {
  //   username: string | null
  //   firstname: string | null
  //   avatar_url: string | null
  // }) {
  //   try {
  //     setLoading(true)

  //     const { error } = await supabase.from('profiles').upsert({
  //       id: user?.id as string,
  //       first_name: firstname,
  //       username,
  //       avatar_url,
  //       updated_at: new Date().toISOString(),
  //     })
  //     if (error) throw error
  //     alert('Profile updated!')
  //   } catch (error) {
  //     alert('Error updating the data!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // return (
  //   <div className="form-widget">
  //     <div>
  //       <label htmlFor="email">Email</label>
  //       <input id="email" type="text" value={user?.email} disabled />
  //     </div>
  //     <div>
  //       <label htmlFor="firstname">Full Name</label>
  //       <input
  //         id="firstname"
  //         type="text"
  //         value={firstname || ''}
  //         onChange={(e) => setFirstname(e.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="username">Username</label>
  //       <input
  //         id="username"
  //         type="text"
  //         value={username || ''}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //     </div>

  //     <div>
  //       <button
  //         className="btn btn-primary"
  //         onClick={() => updateProfile({ firstname, username, avatar_url })}
  //         disabled={loading}
  //       >
  //         {loading ? 'Loading ...' : 'Update'}
  //       </button>
  //     </div>

  //     {/* <LogoutButton /> */}
  //     <button className='btn btn-primary btn-outline mt-5 max-w-fit' onClick={() => router.push('/')}>go to Main Page</button>
  //   </div>
  // )
}
