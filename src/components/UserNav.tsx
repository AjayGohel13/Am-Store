"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import UserAccount from './UserAccount'

type Props = {
    isName?:boolean,
}

const UserNav = ({isName}: Props) => {
    const { user } = useUser()

    return (
        <ul className=" leading-none flex  w-full items-center justify-start ">
            {!user?.id && (<Button variant='ghost' >
                <Link href='/sign-in' > Sign-in </Link>
            </Button>)}

            {!user?.id && (<Button variant='ghost' >
                <Link href='/sign-up' > Sign-up </Link>
            </Button>)}
            {user?.id && (
                <div className=' flex flex-row items-center gap-4'>
                    <UserAccount />
                    <h1 className=' text-base font-bold'>{isName?(user.fullName):""}</h1>
                </div>
            )}


        </ul>
    )
}

export default UserNav