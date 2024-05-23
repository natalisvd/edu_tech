import Image from 'next/image'
import { FileInput } from './upload-file'
import { useFormContext } from 'react-hook-form'
import { PropsWithChildren, useContext } from 'react'
import { AvatarContext } from './account-form'
import { TrashIcon } from '@/app/components/Icons/TrashIcon'
import { EditIcon } from '@/app/components/Icons/EditIcon.'

type AvatarUrl = string | undefined | null

type AvatarProps = {
  url: AvatarUrl
  userName: string
}

const ButtonGroup = ({ children }: PropsWithChildren) => (
  <div className='absolute right-0 top-0 group-hover:visible invisible join join-vertical'>
    {children}
  </div>
)

export const Avatar = ({ url, userName }: AvatarProps) => {
  const { register, getValues, setValue } = useFormContext()
  const { file, resetFile } = useContext(AvatarContext)
  const inputId = 'avatar-input'

  const handleDeleteAvatar = () => {
    console.log('avatar_url', getValues('avatar_url')) // -- ToDo: add delete function
    // setValue('avatar_url', null)
  }

  console.log('url', url)

  return (
    <div>
      <div className='avatar placeholder rounded border border-base-300'>
        <div className='w-72 text-neutral-content relative group'>
          {url && !file && (
            <>
              <div className='absolute w-full h-full transition-all group-hover:backdrop-brightness-75 group-hover:bg-base-300/30' />
              <Image src={url} alt={`${userName}_avatar`} width={228} height={228} priority />
              <ButtonGroup>
                <label htmlFor={inputId} className='btn btn-square btn-ghost rounded join-item' onClick={resetFile}>
                  <EditIcon />
                </label>
                <button className='btn btn-square btn-ghost rounded join-item' onClick={handleDeleteAvatar}>
                  <TrashIcon />
                </button>
              </ButtonGroup>
            </>
          )}
          {file && (
            <>
              <div className='absolute w-full h-full transition-all group-hover:backdrop-brightness-75 group-hover:bg-base-300/30' />
              <Image src={URL.createObjectURL(file)} alt={`${userName}_avatar`} width={228} height={228} />
              <ButtonGroup>
                <label htmlFor={inputId} className='btn btn-square btn-ghost rounded join-item'>
                  <EditIcon />
                </label>
                <button type='button' onClick={resetFile} className='btn btn-square btn-ghost rounded join-item'>
                  <TrashIcon />
                </button>
              </ButtonGroup>
            </>
          )}
          {!url && !file && (
            <label
              htmlFor={inputId}
              className='btn btn-ghost rounded btn-block h-full absolute'
            />
          )}
          <FileInput id={inputId} {...register('avatar_file')} icon={!url && !file} />
        </div>
      </div>
    </div>
  )
}
