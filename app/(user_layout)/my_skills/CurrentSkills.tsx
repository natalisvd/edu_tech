"use client"

import { useCallback, useRef, useState } from "react"
import { UserSkill, UserSkills } from "./types"
import { EditIcon } from "@/app/components/Icons/EditIcon."
import { SelectLevel } from "./selectLevel"
import { useForm } from "react-hook-form"
import { updateUserSkillLevel } from "./actions"

const defaultValues = { level: 'none' }

type FormValues = {
  level: string
}

export const CurrentSkills = ({ skills }: { skills: UserSkills }) => {
  const [currentSkill, setCurrentSkill] = useState<UserSkill | null>(null)

  const modalRef = useRef<HTMLDialogElement>(null)

  const handleShow = useCallback((skill: UserSkill) => {
    setCurrentSkill(skill)
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleClose = useCallback(() => {
    setCurrentSkill(null)
    modalRef.current?.close();
  }, [modalRef]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    values: {level: currentSkill?.lvl || ''}
  })
  const onSubmit = async (data: FormValues) => {
    const { level } = data
    console.log('id, level', currentSkill?.id, level)
    const id = currentSkill?.id
    if (!id) return;
    const response = await updateUserSkillLevel({ id, level })
    console.log(response)
    reset()
    handleClose()
  }

  return (
    <>
      <div className='grid grid-flow-row gap-3 max-w-md'>
        {skills.map((skill) => (
          <div key={skill.id} className="grid grid-cols-[1fr,_1fr,_auto] items-center gap-1">
            <div className="text-sm sm:text-base">{skill.skill?.skill_name}</div>
            <div className="text-sm sm:text-base">{skill.lvl}</div>
            <div className="text-sm sm:text-base">
              <button className='btn btn-ghost btn-square btn-sm' onClick={() => handleShow(skill)}>
                <EditIcon />
              </button>
            </div>
          </div>
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
