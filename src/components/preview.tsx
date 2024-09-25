"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css"

type Props = {
    value:string
}

export const Preview = ({ value}: Props) => {
    const ReactQuill = useMemo(()=> dynamic(()=> import("react-quill"),{ssr:false}),[])

  return (
    <div className=" bg-gray-200 dark:bg-zinc-800 text-black dark:text-white ">
        <ReactQuill
            theme="bubble"
            value={value}
            readOnly
        />
    </div>
  )
}

