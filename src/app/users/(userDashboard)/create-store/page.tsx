import { PackageOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import React from 'react'
import RegisterForm from "./_components/register-form"
import UserAccount from "@/components/UserAccount"



const page = () => {
    return (
        <div className="flex my-20 w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 dark:bg-black p-4 md:gap-8 md:p-10">
                <div className="mx-auto items-center w-full max-w-screen-2xl flex gap-2">
                    <PackageOpen className=" bg-gray-700/30 p-2 rounded-lg h-14 w-14  text-black dark:text-gray-200"/>
                    <h1 className="text-3xl font-semibold  text-black dark:text-gray-200">Create Store</h1>
                </div>
                <div className="mx-auto grid w-full max-w-screen-2xl items-start gap-6 ">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                    </nav>
                    <div className="grid gap-6">
                        <RegisterForm/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page
