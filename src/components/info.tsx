"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Info = (props: Props) => {
    const {user} = useUser()
  return (
    <h1 className=' text-lg sm:text-3xl font-bold dark:text-white'>Welcomeback,{" "}{user?.fullName}</h1>
  )
}

export default Info