'use client'

export const LogoutButton = () => {
  return (
    <form action="/auth/logout" method="post">
      <button className="btn btn-primary" type="submit">
        Log out
      </button>
    </form>
  )
}