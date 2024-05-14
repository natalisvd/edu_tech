export const Loading = () => {
  return (
    <div className="grid grid-flow-row gap-y-5">
      <div className='form-control gap-2.5'>
        <div className='h-6 w-32 skeleton' />
        <div className="h-12 skeleton w-full" />
      </div>
      <div className='form-control gap-2.5'>
        <div className='h-6 w-32 skeleton' />
        <div className="h-12 skeleton w-full" />
      </div>
      <div className='form-control gap-2.5'>
        <div className='h-6 w-32 skeleton' />
        <div className="h-12 skeleton w-full" />
      </div>
      <div className='form-control gap-2.5'>
        <div className='h-6 w-32 skeleton' />
        <div className="h-12 skeleton w-full" />
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <div className="w-full h-12 skeleton" />
        <div className="w-full h-12 skeleton" />
      </div>
    </div>
  )
}