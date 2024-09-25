"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, ShoppingCart, UserIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import UserAccount from "../UserAccount";

import { useUser } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import SeerchInput from "../search-input";

interface Links {
  label: string;
  href: string;
  icon?: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  xl:flex xl:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const { user } = useUser();
  return (
    <>
      <div
        className={cn(
          "h-10 z-50  py-6 flex flex-row xl:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-between items-center z-100 w-full">
          <div className=" flex flrow gap-2 items-center ">
            <MenuIcon
              className="text-neutral-800 h-8 w-8 dark:text-neutral-200 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            <ModeToggle />
          </div>
          <div>
            <SeerchInput />

          </div>
          <div className=" flex flex-row items-center justify-center ">
            <Link href='/' className=' block lg:hidden'>
              <div className="items-center flex  ">
                <Image
                  width={100}
                  height={100}
                  src="/logo.png"
                  alt="Logo"
                  className=" h-11 w-11 "
                />
              </div>
            </Link>
            <div >
              {!user?.id && <div className=" px-2">
                <Link href="/sign-in" >
                  <Button variant="ghost" size="icon">
                    <UserIcon className=" h-6 w-6 text-black dark:text-white" />
                  </Button>
                </Link>
              </div>}
            </div>
            <Link href="/cart" className="px-2" >
              <Button variant="ghost" size="icon">
                <ShoppingCart className=" h-6 w-6 text-black dark:text-white" />
              </Button>
            </Link>
            <UserAccount />
          </div>

        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[9999] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  label,
  ...props
}: {
  link: string;
  className?: string;
  props?: LinkProps;
  label: string,
}) => {
  const { open, animate, setOpen } = useSidebar();
  return (
    <Link
      href={link}
      onClick={() => setOpen(false)}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 font-bold  dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {label}
      </motion.span>
    </Link>
  );
};
