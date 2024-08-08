export type AccountFormValues = {
  firstName: string | null
  lastName: string | null
  avatar_url: string | null
  avatar_file: any
}

export type AlertProps = {
  message: string
  severity?: string
}

export type AvatarUrl = string | null

export type AvatarProps = {
  url: AvatarUrl
  // userName: string
}
