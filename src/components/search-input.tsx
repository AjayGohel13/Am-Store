"use client"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

type Props = {}

const SeerchInput = (props: Props) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentCategoryId = searchParams.get("categoryId");
    const isSearchPage = pathname === "/product";

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url)
    }, [debouncedValue, currentCategoryId, router, pathname])

    return (
        <div>
            {isSearchPage && (

                <div className="relative" >
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className=" border dark:border-zinc-500 max-w-65 md:w-[300px] pl-9 rounded-lg text-black-2 dark:text-white bg-slate-100 dark:bg-zinc-800"
                        placeholder=" Search products"
                    />
                    <Search className=" dark:text-slate-200 h-4 w-4 absolute top-3 left-3 text-slate-600" />
                </div>
            )}
        </div>
    )
}

export default SeerchInput