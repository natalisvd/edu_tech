"use client"

import createNewLesson from "../action"

export const CTAButton = () => {
  const handleClick = async () => {
    console.log('click CTAbutton')
    try {
      const result = await createNewLesson()
      console.log('result', result)
    } catch (error) {
      console.log('CTAbutton [error]', error)
    }
  }
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Create new lesson
    </button>
  )

}
