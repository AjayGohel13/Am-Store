"use client"
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Home, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react'


const UserAccount = () => {
    const { resolvedTheme } = useTheme();

    return (
        <UserButton
        appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
    >

        <UserButton.MenuItems >
            <UserButton.Link
                label="Continue to Dashboard"
                labelIcon={<LayoutDashboard className=' h-4 w-4' />}
                href="/users/dashboard"
            />
            <UserButton.Link
                label="Back to Home"
                labelIcon={<Home className=' h-4 w-4' />}
                href="/"
            />
            <UserButton.Link
                label="Help"
                labelIcon={<QuestionMarkCircledIcon className=' h-4 w-4' />}
                href="/"
            />
            <UserButton.UserProfilePage label="account"  />
            <UserButton.UserProfilePage label="security" />
        </UserButton.MenuItems>


    </UserButton>
    )
}

export default UserAccount