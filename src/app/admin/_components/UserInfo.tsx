"use client"
import UserAccount from "@/components/UserAccount"
import { useUser } from "@clerk/nextjs"
type Props = {}

const UserInfo = (props: Props) => {
    const { user } = useUser()
    return (
        <div className="px-5 w-full max-w-screen-2xl flex flex-row items-center justify-between gap-5" >
            <div className="flex items-center  ">
                <div className=" flex flex-col items-start justify-center ">

                    <h1 className=" text-3xl font-bold ">
                        Welcome Back!
                    </h1>
                    {user?.fullName}{" "}
                </div>
            </div>
            <div>
                <UserAccount />
            </div>

        </div>
    )
}

export default UserInfo