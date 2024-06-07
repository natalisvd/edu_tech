export enum EnumLevels {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export const LEVELS = Object.values(EnumLevels)

export type LevelsType = Record<EnumLevels, string>
