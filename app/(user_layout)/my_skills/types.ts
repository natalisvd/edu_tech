export interface SkillToUser {
  id?: string
  created_at?: string
  skill_id?: number
  user_id?: string
  lvl?: string
}

export interface Skill {
  id: number
  created_at?: string | null
  skill_name: string | null
}

export interface SkillFormProps {
  initialValues?: SkillFormValues
  skillsList: Skills,
  toggleModal: () => void
  onSubmit: (data: SkillFormValues) => Promise<void>
}

export type SkillFormValues = { 
  skill: number
  level: string
}

export type UpdateSkillProps = {
  userId: string
  skill: number
  level: string
  approved?: boolean
}

export type SkillsToUser = SkillToUser[] | []

export type Skills = Skill[] | []