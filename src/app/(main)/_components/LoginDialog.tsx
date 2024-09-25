"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from "next/image"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";


const LoginDialog = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { user } = useUser()
    useEffect(() => {
        if (!user?.id) {
            setShowDialog(true);
        } else {
            setShowDialog(false)
        }
    }, [user?.id]);

    return (
        <Dialog open={showDialog} >
            <DialogContent className="sm:max-w-5xl dark:bg-black dark:border-zinc-800">
                <DialogHeader className=" flex flex-row items-center justify-end ">
                    <DialogTitle className=' text-3xl text-rose-400 font-bold'>
                        <Button
                            onClick={() => setShowDialog(false)}
                            variant='outline'
                            className="text-black dark:text-white"
                        >
                            <X />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col  md:flex-row justify-between items-center  ">
                    <div className="flex flex-col items-center justify-center w-full">
                        <Image
                            height={180}
                            width={180}
                            loading="eager"
                            className="z-10 h-60 w-60 rounded-md object-center  "
                            src="/logo.png"
                            alt="product image"
                        />
                        <div className=" flex flex-col text-center px-5 gap-3 ">
                            <h2 className=" text-xl dark:text-white font-semibold">UP TO <span className=" text-emerald-400"> 30% OFF</span></h2>
                            <h1 className=" text-3xl dark:text-white font-bold">SIGN UP TO <span className=" text-emerald-400"> 30% OFF</span></h1>
                            <Link href="/sign-in">
                                <Button variant="cart">
                                    Sign-In
                                </Button>
                            </Link>
                            <p className=" text-muted-foreground text-sm">Subscribe to the Am-Store eCommerce newsletter to receive timely updates from your favorite products.</p>
                        </div>
                    </div>

                </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog