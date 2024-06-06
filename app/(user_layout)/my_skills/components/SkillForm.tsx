"use client"

import { useForm } from "react-hook-form"
import { SkillFormProps, SkillFormValues } from "../types"
import { SelectSkill } from "./SelectNewSkill"
import { SelectLevel } from "./SelectLevel"

const defaultValues = {
  skill: 0,
  level: 'none'
}

export const SkillForm = ({ initialValues, skillsList, toggleModal, onSubmit }: SkillFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<SkillFormValues>({
    defaultValues: initialValues ?? defaultValues
  })

  const addSkill = async (data: SkillFormValues) => {
    try {
      await onSubmit(data)
      toggleModal()
      reset()
    } catch (error) {
      console.log(error)
      setError('root.serverError', { type: 'serverError', message: 'Something went wrong. Try again later.'})
    }
  }
  const handleClose = async () => {
    toggleModal()
    reset()
  }

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
        {errors.root?.serverError?.message && <div className="label label-text-alt text-error">{errors.root.serverError.message}</div>}
      </div>
      <div className='modal-action'>
        <button type="submit" className="btn btn-primary">Confirm</button>
        <button type="button" className="btn btn-outline" onClick={handleClose}>Close</button>
      </div>
    </form>
  )
}
