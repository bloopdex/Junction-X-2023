import React from 'react'

export default function Information() {
  return (
    <div className='flex flex-col'>
        
        <label htmlFor="email" className="font-bold font-source text-gray-700">Email</label>
      <input type="email" id="email"  className="py-3 mb-3 px-3 w-full bg-input text-start border border-gray-300 rounded-md"/>


       <div className='flex justify-between'>
         <label htmlFor="password" className="mb-2 font-bold font-source text-gray-700">Password</label>
         <button className='text-green_custom underline'>Forgot password?</button>
         </div>
      <input type="password" id="password" className="py-3 mb-6 px-3 bg-input placeholder:text-left w-full border border-gray-300 rounded-md"/>
       
        <button className='px-4 w-full rounded py-3 font-source bg-green_custom text-white text-base font-normal' >SignIn</button>

    </div>
  )
}
