"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css"

type Props = {
    value:string
}

export const FeaturePreview = ({ value}: Props) => {
    const ReactQuill = useMemo(()=> dynamic(()=> import("react-quill"),{ssr:false}),[])

  return (
    <div className="dark:bg-slate-950 dark:text-white ">
        <ReactQuill
            theme="bubble"
            value={value}
            readOnly
        />
    </div>
  )
}

