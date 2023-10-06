import React from 'react'
import Logo from '../components/logo'
import Googlelogin from '~/components/googlelogin'
import LinedText from '~/components/linedText'
import Information from '~/components/information'


export default function Auth() {
  return (
    <div className='flex w-screen h-screen '>

        <div className='w-1/3 h-screen flex items-center '>
        <Logo/>
            <div className='flex flex-col justify-center mt-4 w-full items-center'>
            
            <div className='flex flex-col justify-start px-4 py-4'>

            <h1 className=' font-serif font-medium text-4xl'>Login into your account</h1>
            <div className='flex gap-2 justify-start mb-4 '>
            <h2 className=' font-bold  font-popins'>Don't have an account? </h2>
            <button  className=' font-semibold  font-popins text-green_custom'> Signup</button>
            </div>
            

            <Googlelogin/>
            <LinedText/>
            <Information/>
            </div>
            </div>

        </div>
        <div className='flex flex-col justify-center items-center w-2/3 bg-bg_custom p-5'>

          <div className='flex flex-col items-start w-full pt-26 px-10 justify-start'>
          <h1 className='font-roboto font-extrabold text-2xl text-green_custom '>
          SkyLink is here
          </h1>
          <p className='font-roboto font-medium text-lg'>
          Track drones in real-time with our website, <br /> providing accurate mapping and live data for <br /> secure aerial monitoring.
          </p>
          </div>
          <img className=' w-[70%] ' src="/drone.png" alt="drones" />

        </div>

    </div>
  )
}
