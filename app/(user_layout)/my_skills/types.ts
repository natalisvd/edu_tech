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
}

export type SkillFormValues = { 
  skill: number | undefined
  level: string
}

export type SkillsToUser = SkillToUser[] | []

export type Skills = Skill[] | []