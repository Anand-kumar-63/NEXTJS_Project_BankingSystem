import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const page = () => {
  getLoggedInUser();
  return (
    <div className='w-1/2'>
   <AuthForm type='sign-up' />
   </div>
  )
}

export default page