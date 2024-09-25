"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { SelectForVariant } from '@/components/select'
type Props = {
    options: { label: string; value: string }[]

}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    categoryId: z.string().min(1, {
        message: "category is required",
    })
})

const Creationform = ({ options }: Props) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post("/api/product", values)
            console.log(res.data.id)
            router.push(`/users/product/${res.data.id}`)
            toast.success("Product created successfully")
        } catch (error) {
            toast.error("Something went Wrong!")
        }
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className=' flex flex-col md:flex-row gap-4 w-full '>

                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=' dark:text-white '>
                                    Product name
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g 'Electronics, Fashions'" {...field} className=' dark:bg-slate-600/50 dark:border-slate-500 w-full min-w-[300px] ' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=' dark:text-white '>
                                    Product Category
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <SelectForVariant 
                                            options={[...options]}
                                            {...field}
                                        />


                                    </>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className=' flex items-center gap-x-2 mt-5'>
                    <Link href="/" >
                        <Button variant="outline" className=" dark:text-white" type='button'>
                            Cancel
                        </Button>
                    </Link>
                    <Button type='submit' variant="outline" className=" dark:text-white" disabled={!isValid || isSubmitting}>
                        Continue
                    </Button>

                </div>
            </form>

        </Form>
    )
}

export default Creationform