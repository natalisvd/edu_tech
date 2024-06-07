import { useId } from "react"

const INPUTS = [1, 2, 3, 4]

export const Loading = () => {
  const id = useId()
  return (
    <div className='grid md:grid-cols-[auto,_1fr] gap-5 mb-10 w-full justify-items-center md:justify-items-stretch'>
      <SkeletonAvatar />
      <div className='md:max-w-xl w-full'>
        <div className="grid grid-flow-row gap-y-5">
          {
            INPUTS.map((item) => (
              <SkeletonInputWithLabel key={id.concat(item.toString())}/>
            ))
          }
          <div className='grid grid-cols-2 gap-5'>
            <SkeletonButton />
            <SkeletonButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonAvatar = () => (
  <div className='pt-2'>
    <div className='w-72 h-72 skeleton rounded' />
  </div>
)

export const SkeletonInputWithLabel = () => (
  <div className='form-control'>
    <div className='h-5 w-32 my-2 mx-1 skeleton' />
    <div className="h-12 skeleton w-full" />
  </div>
)
export const SkeletonButton = () => <div className="w-full h-12 skeleton" />

