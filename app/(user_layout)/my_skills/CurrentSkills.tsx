"use client"

import { PropsWithChildren, useCallback, useRef, useState } from "react"
import { UserSkill, UserSkills } from "./types"
import { EditIcon } from "@/app/components/Icons/EditIcon."
import { SelectLevel } from "./selectLevel"
import { useForm } from "react-hook-form"
import { deleteSkillbyId, updateUserSkillLevel } from "./actions"
import { TrashIcon } from "@/app/components/Icons/TrashIcon"

const defaultValues = { level: 'none' }

type FormValues = {
  level: string
}

const TableRow = ({ children }: PropsWithChildren) => (
  <div className="grid max-sm:grid-rows-2 max-sm:grid-cols-[1fr,_auto] sm:grid-cols-[1fr,_1fr,_auto] items-center gap-1 px-3 py-2 border-b border-neutral last-of-type:border-b-0">
    {children}
  </div>
)

export const CurrentSkills = ({ skills }: { skills: UserSkills }) => {
  const [currentSkill, setCurrentSkill] = useState<UserSkill | null>(null)

  const modalRef = useRef<HTMLDialogElement>(null)

  const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm<FormValues>({
    defaultValues: { level: '' },
    reValidateMode: 'onChange'
  })

  const handleShow = useCallback((skill: UserSkill) => {
    setCurrentSkill(skill)
    setValue('level', skill.lvl)
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleClose = useCallback(() => {
    setCurrentSkill(null)
    reset()
    modalRef.current?.close();
  }, [modalRef]);

  const onSubmit = async (data: FormValues) => {
    const { level } = data
    try {
      const id = currentSkill?.id
      if (!id) {
        throw new Error(`Error: id is ${id}`)
      }
      await updateUserSkillLevel({ id, level })
      handleClose()
    } catch (error) {
      console.log('updateUserSkillLevel [error]', error)
      return setError('root.serverError', { type: 'manual', message: 'Something went wrong'})
    }
  }
  console.log('errors', errors)
  const handleDeleteSkill = async (id: string) => await deleteSkillbyId({ id })

  return (
    <>
      <div className='grid grid-flow-row w-full my-5 border border-neutral'>
        {skills.map((skill) => (
          <TableRow key={skill.id}>
            <div className="font-semibold">{skill.skill?.skill_name}</div>
            <div className="text-base font-light">{skill.lvl}</div>
            <div className="max-sm:col-start-2 max-sm:row-start-1 max-sm:row-span-2 flex gap-5">
              <button className='btn btn-square hover:btn-primary' onClick={() => handleShow(skill)}>
                <EditIcon />
              </button>
              <button className='btn btn-square hover:btn-error' onClick={() => handleDeleteSkill(skill.id)}>
                <TrashIcon />
              </button>
            </div>
          </TableRow>
        ))}
        <dialog id="add-new-skill-modal" className="modal" ref={modalRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit skill level</h3>
            <p className="py-4">Here you can edit level for <b>{currentSkill?.skill.skill_name}</b></p>
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className='form-control w-full max-w-sm'>
                  <SelectLevel
                    defaultValue={defaultValues.level}
                    {...register('level', {
                      validate: (value) => value === defaultValues.level ? 'Select level to continue' : true
                      }
                    )}
                  />
                  {errors.level?.message && <div className="label label-text-alt text-error">{errors.level.message}</div>}
                  {errors.root?.serverError?.message && <div className="label label-text-alt text-error">{errors.root.serverError.message}</div>}
                </div>
              </div>
              <div className='modal-action'>
                <button type="submit" className="btn btn-primary">Confirm</button>
                <button type="button" className="btn btn-outline" onClick={handleClose}>Close</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  )
}
