"use client"

import { useForm } from "react-hook-form"
import { SkillFormProps, SkillFormValues } from "./types"
import { SelectSkill } from "./selectNewSkill"
import { SelectLevel } from "./selectLevel"

const defaultValues = {
  skill: 0,
  level: 'none'
}

export const SkillForm = ({ initialValues, skillsList, toggleModal, onSubmit }: SkillFormProps) => {
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<SkillFormValues>({
    defaultValues: initialValues ?? defaultValues
  })

  const addSkill = async (data: SkillFormValues) => {
    // ToDo: add submit action here
    try {
      await onSubmit(data)
      toggleModal()
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose = async () => {
    toggleModal()
    reset()
  }

  const values = watch(['level', 'skill'])
  console.log('values', values)

  return (
    <form method="dialog" onSubmit={handleSubmit(addSkill)}>
      <div className="flex flex-col gap-5">
        <div className='form-control w-full max-w-sm'>
          <SelectSkill
            skillsList={skillsList}
            defaultValue={defaultValues.skill}
            {...register('skill', {
              valueAsNumber: true,
              validate: (value) => value === defaultValues.skill ? 'Select skill to continue' : true
              }
            )}
          />
          {errors.skill?.message && <div className="label label-text-alt text-error">{errors.skill.message}</div>}
        </div>
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
        <button className="btn btn-outline" onClick={handleClose}>Close</button>
      </div>
    </form>
  )
}
