'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

type AlertProps = {
  message: string
  severity?: string
}

function Alert ({ message, severity, onHide }: AlertProps & { onHide: () => void }) {
  return (
      <div className={`alert alert-${severity ?? 'success'} flex flex-row justify-between items-start gap-5`}>
        <div>{message}</div>
        <button className='btn btn-ghost btn-square btn-xs' onClick={onHide}>X</button>
    </div>
  )
}

export default function AccountForm({ user }: { user: User | null }) {
  const router = useRouter()

  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState<string | null>(null)
  const [lastname, setLastname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [alert, setAlert] = useState<AlertProps | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFirstname(data?.first_name)
        setLastname(data?.last_name)
        setUsername(data?.username)
        setAvatarUrl(data?.avatar_url)
      }
    } catch (error) {
      setAlert({ message: 'Error loading user data!', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    firstname,
    lastname,
    // avatar_url,
  }: {
    username: string | null
    firstname: string | null
    lastname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        first_name: firstname,
        last_name: lastname,
        username,
        // avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      setAlert({ message: 'Profile updated!' })
    } catch (error) {
      setAlert({message: 'Error updating the data!', severity: 'error'})
    } finally {
      setLoading(false)
    }
  }

  return (
  <>
    {alert?.message && <Alert message={alert.message} severity={alert?.severity} onHide={() => setAlert(null)} />}
    <div className="grid grid-flow-row gap-y-5">
      <div className='form-control gap-2.5'>
        <label htmlFor="email">Email</label>
        <input className='input input-bordered' id="email" type="text" value={user?.email} disabled />
      </div>
      <div className='form-control gap-2.5'>
        <label htmlFor="firstname">First Name</label>
        <input
          className='input input-bordered'
          id="firstname"
          type="text"
          value={firstname || ''}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className='form-control gap-2.5'>
        <label htmlFor="lastname">Last Name</label>
        <input
          className='input input-bordered'
          id="lastname"
          type="text"
          value={lastname || ''}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className='form-control gap-2.5'>
        <label htmlFor="username">Username</label>
        <input
          className='input input-bordered'
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <button className='btn btn-primary btn-block btn-outline' onClick={() => router.push('/')}>go to Main Page</button>
        <button
          className="btn btn-primary btn-block"
          onClick={() => updateProfile({ firstname, username, lastname, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </div>
    </>
  )
}
