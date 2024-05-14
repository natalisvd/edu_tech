export type AccountFormValues = {
  firstname: string | null
  lastname: string | null
  username: string | null
  avatar_url: string | null
}

export type AlertProps = {
  message: string
  severity?: string
}
