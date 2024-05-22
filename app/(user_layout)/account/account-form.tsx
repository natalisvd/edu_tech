'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
// import { updateProfilefromServer } from './actions'
import { AccountFormValues as FormValues, AlertProps } from './types'
import { Avatar } from './avatar'

function Alert ({ message, severity, onHide }: AlertProps & { onHide: () => void }) {
  return (
      <div className={`alert alert-${severity ?? 'success'} flex flex-row justify-between items-start gap-5`}>
        <div>{message}</div>
        <button className='btn btn-ghost btn-square btn-xs' onClick={onHide}>X</button>
    </div>
  )
}

const initialValues = {
  firstname: '',
  lastname: '',
  username: '',
  avatar_url: '',
}

export default function AccountForm({ user }: { user: User | null }) {
  const router = useRouter()

  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState<FormValues>()
  const [alert, setAlert] = useState<AlertProps | null>(null)

  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm<FormValues>({
    defaultValues: initialValues,
    values
  })

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
        return setValues({
          firstname: data?.first_name ?? '',
          lastname: data?.last_name ?? '',
          username: data?.username ?? '',
          avatar_url: data?.avatar_url ?? '',
        })
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
    avatar_url,
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
      // if (error)
      if (error) {
        throw error
      }
      setAlert({ message: 'Profile updated!' })
    } catch (error) {
      setAlert({ message: 'Error updating the data!', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className='grid md:grid-cols-[auto,_1fr] gap-5 mb-10 w-full justify-items-center md:justify-items-stretch'>
    <Avatar url={values?.avatar_url} userName={values?.username || 'User' } />
    <div className='md:max-w-xl w-full'>
    <form className="grid grid-flow-row gap-y-5" onSubmit={handleSubmit(updateProfile)}>
      <div className='form-control'>
        <label htmlFor="email" className='label label-text'>Email</label>
        <input
          className='input input-bordered'
          id="email"
          type="text"
          value={user?.email}
          // readOnly
          disabled
        />
      </div>
      <div className='form-control'>
        <label htmlFor="firstname" className='label label-text'>First Name</label>
        <input
          {...register('firstname')}
          className='input input-bordered'
          id="firstname"
          type="text"
        />
      </div>
      <div className='form-control'>
        <label htmlFor="lastname" className='label label-text'>Last Name</label>
        <input
          {...register('lastname')}
          className='input input-bordered'
          id="lastname"
          type="text"
        />
      </div>
      <div className='form-control'>
        <label htmlFor="username" className='label label-text'>Username</label>
        <input
          {...register('username', { required: 'Username is required', minLength: { value: 3, message: "Username must be at least 3 characters" }})}
          className='input input-bordered'
          id="username"
          type="text"
        />
        {errors?.username && <p className='label label-text-alt text-error'>{errors?.username?.message}</p>}
      </div>
      
      {alert?.message && <Alert message={alert.message} severity={alert?.severity} onHide={() => setAlert(null)} />}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <button type='button' className='btn btn-primary btn-block btn-outline order-last md:order-none' onClick={() => router.push('/')}>go to Main Page</button>
        <button
          className="btn btn-primary btn-block"
          type='submit'
          disabled={loading || !isValid}
          >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </form>
    </div>
    </div>
  )
}
