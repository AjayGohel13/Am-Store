import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa'

type Props = {}

const Footer = (props: Props) => {

    const social_media_links = [
        {
            href: "https://www.linkedin.com/in/ajay-gohel-5ab279300?utm_source=share&utm_compaign=share_via&utm_content=profilr&utm_medium=android_app",
            label: "LinkedIn",
            icon: <FaFacebook className=' h-6 w-6' />
        },
        {
            href: "https://www.linkedin.com/in/ajay-gohel-5ab279300?utm_source=share&utm_compaign=share_via&utm_content=profilr&utm_medium=android_app",
            label: "Twitter",
            icon: <FaTwitter className=' h-6 w-6' />
        },
        {
            href: "https://www.linkedin.com/in/ajay-gohel-5ab279300?utm_source=share&utm_compaign=share_via&utm_content=profilr&utm_medium=android_app",
            label: "Facebook",
            icon: <FaInstagramSquare className=' h-6 w-6' />

        },
        {
            href: "https://www.linkedin.com/in/ajay-gohel-5ab279300?utm_source=share&utm_compaign=share_via&utm_content=profilr&utm_medium=android_app",
            label: "Instagram",
            icon: <FaLinkedin className=' h-6 w-6' />
        },
    ]
    const join_perks = [
        {
            href: "/users/create-product",
            label: "Sell on Am-Store",
        },
        {
            href: "/users/create-store",
            label: "Create your own store",
        },
        {
            href: "/users/dashboard",
            label: "Build your own brand",
        },
        {
            href: "/users/contact",
            label: "Advertise your product",
        },
    ]
    return (
        <div>
            <footer className="text-gray-600 dark:text-white body-font">
                <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="/">
                            <Image
                                height={100}
                                width={100}
                                alt='logo image'
                                src="/logo.png"
                                className=' h-14 w-14'
                            />
                            <span className="ml-3 text-2xl font-bold dark:text-white">AM - Store</span>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">A market place for online store</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium  tracking-widest text-sm mb-3 ">Get To know Us</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">About Us</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Press release</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Our services</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Careers</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium  tracking-widest text-sm mb-3">Contack us</h2>
                            <nav className="list-none mb-10">
                                {social_media_links.map((link) => (
                                    <li key={link.label}>
                                        <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer" href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium  tracking-widest text-sm mb-3">Join us</h2>
                            <nav className="list-none mb-10">
                                {join_perks.map((perk) => (
                                    <li key={perk.href}>
                                        <Link className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400" href={perk.href}>{perk.label}</Link>
                                    </li>
                                ))}
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium  tracking-widest text-sm mb-3">Help</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Your account</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Continue to dashboard</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">100% protection</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-400">Help</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 Am-Store —
                            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@ajaygohel</a>
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            {social_media_links.map((link) => (
                                <a className="text-gray-500 mx-2" href={link.href} key={link.label}>
                                    {link.icon}
                                </a>
                            ))}

                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer