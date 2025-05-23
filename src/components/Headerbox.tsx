import React from 'react'

const Headerbox = ({type,title,user,subtext}:HeaderBoxProps) => {
  return (
    <div className='flex justify-center'>
        <div className='flex flex-col gap-1'>
            <h1 className='text-24 lg:text-30 ml-10 text-4xl font-semibold text-gray-900'>{title},
                {type == "greeting"&&(
                    <span className='text-blue-500'>{user}</span>
                )}
            </h1>
            <p className=' text-14 lg:text-16 text-2xl font-normal text-gray-600'>{subtext}</p>
        </div>
    </div>
  )
}

export default Headerbox