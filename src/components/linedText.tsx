import React from 'react'

export default function LinedText() {
  return (
    <div className='flex w-full gap-2 items-center justify-center '> 
        <div className=' w-1/5 h-0 border-black border-b-[1px]'></div>
        <h1 className=' text-sm font-semibold font-roboto '>or with email and password</h1>
        <div className=' w-1/5 h-0 border-black border-b-[1px]'></div>
    </div>
  )
}
