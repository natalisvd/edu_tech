"use client"

import { useForm } from "react-hook-form"
import { Skills } from "./types"
import { SelectSkill } from "./selectNewSkill"

export const AddNewSkill = ({ skillsList }: {skillsList: Skills}) => {
  const { register, watch } = useForm({
    defaultValues: {
      selectSkill: 0
    }
  })
  console.log(watch('selectSkill'))

  return (
    <SelectSkill skillsList={skillsList} {...register('selectSkill')} />
  )
}