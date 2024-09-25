"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Codepen, Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@prisma/client"
import { SelectForVariant } from "@/components/select"
import { cn } from "@/lib/utils"
const formSchema = z.object({
    brand: z.string().min(1)
})
type Props = {
    data: Product;
    productId: string;
    options: { label: string; value: string }[]

}

const TitleForm = ({ options, data, productId }: Props) => {

    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: data.brand || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;
    const toggleEdit = () => setIsEditing((current) => !current)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/product/${productId}`, values)
            toast.info("Product brand updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went Wrong!")
        }
    }
    const selectedOptions = options.find((option) => (option.value === data.categoryId));

    return (
        <div className=" mt-6 dark:text-white text-black rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
                <div className=" flex items-center gap-2">
                    <Codepen className="h-12 w-12 bg-gray-300/35 p-2 rounded-sm " />
                    <p className="hidden sm:block">
                        Brand
                    </p>
                </div>
                <Button onClick={toggleEdit} variant='ghost' className=" dark:bg-slate-900 bg-slate-100 text-black dark:text-white">
                    {isEditing && (
                        <>Cancel</>

                    )}
                    {!isEditing && (
                        <>
                            <Pencil className=" h-4 w-4 mr-2" />
                            Edit Brand
                        </>
                    )}

                </Button>

            </div>
            {!isEditing && (
                <p className={cn(
                    " text-sm mt-2 dark:bg-zinc-800 bg-zinc-200 p-3 rounded-md",
                    !data.brand && " text-slate-500 italic"
                )}>
                    {data.brand
                        ? data.brand : "No Brand Selected"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <SelectForVariant
                                            options={[...options]}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className=" flex items-center gap-x-2">
                            <Button
                                disabled={isSubmitting}
                                className=" text-white dark:bg-neutral-600  dark:hover:bg-neutral-500 " >
                                Save
                            </Button>
                        </div>

                    </form>
                </Form>
            )}
        </div>
    )
}

export default TitleForm