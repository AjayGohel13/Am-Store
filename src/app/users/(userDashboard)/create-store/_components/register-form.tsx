"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import {  Loader } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Store name is required",
    }),
    owner: z.string().min(1, {
        message: "Store name is required",
    }),

})

const RegisterForm = () => {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/users/create-store", values)
            toast({
                title: "Store generated successfully",
            })
            router.push(`/users/create-product`)
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Form {...form} >
            {isLoading || isSubmitting && <div className=" absolute h-full w-full bg-neutral-700/60 top-0 left-0 rounded-m flex items-center justify-center">
                <Loader className=" h-5 w-5 animate-spin dark:text-whiten text-black-2" />
            </div>}
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="grid gap-6">
                    <Card x-chunk="dashboard-04-chunk-1" className=" dark:bg-black dark:border-zinc-700">
                        <CardHeader>
                            <CardTitle>Store Name</CardTitle>
                            <CardDescription>
                                Used to identify your store in the marketplace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Store name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardHeader>
                            <CardTitle>Owner Name</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="owner"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input disabled={isSubmitting} placeholder="Owner name..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include" defaultChecked />
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Allow administrators to change the directory.
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t dark:border-zinc-700 px-6 py-4">
                            <Button
                                type='submit'
                                disabled={!isValid || isSubmitting || isLoading}
                            >
                                Save
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            </form>

        </Form>

    )
}

export default RegisterForm