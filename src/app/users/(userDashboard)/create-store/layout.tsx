import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import UserAccount from "@/components/UserAccount";
import { Metadata } from "next"
import Image from "next/image";
import Link from "next/link";
type props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "AM Store | Online shopping site for Electronics, Furniture, and Much more",
};
const Dashboardlayout = ({ children }: props) => {
    return (
        <div className="w-full bg-white dark:bg-black ">
            <div className=" w-full  space-x-4 bg-slate-100 dark:bg-zinc-900 px-2 pr-4  py-2 rounded-md  ">
                <div className=" max-w-screen-2xl mx-auto flex items-center justify-between">

                    <div className=" flex flex-row gap-4 items-center ">
                        <Link href="/" className='  flex flex-row items-center  '>
                            <Image
                                width={150}
                                height={150}
                                src="/logo.png"
                                alt="Logo"
                                className=" h-12 w-12  sm:h-20 sm:w-20 "
                            />
                            <h1 className='bg-gradient-to-b from-lime-400 to-gray-800  text-transparent bg-clip-text text-xl sm:text-3xl font-bold'>Am-Store</h1>
                        </Link>

                    </div>
                    <div className=" flex flex-row gap-4 items-center ">
                        <Search />
                        <ModeToggle />
                        <UserAccount />
                    </div>
                </div>

            </div>
            {children}
        </div>
    )
}

export default Dashboardlayout


