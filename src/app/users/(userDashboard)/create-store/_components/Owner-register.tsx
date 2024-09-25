"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import { Captions, Loader, Pencil } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { store } from "@prisma/client"
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
    owner: z.string().min(1, {
        message: "Store name is required",
    }),

})
type Props = {}

const OwnerRegister = (props: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            owner: "",
        }
    })
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/users/create-store", values)
            router.push(`/users/create-product`)
            toast({
                title: "Owner name Generated",
            })
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
        <Form {...form}>

            {isLoading || isSubmitting && <div className=" absolute h-full w-full bg-neutral-700/60 top-0 left-0 rounded-m flex items-center justify-center">
                <Loader className=" h-5 w-5 animate-spin dark:text-whiten text-black-2" />
            </div>}
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card x-chunk="dashboard-04-chunk-2">
                    <CardHeader>
                        <CardTitle>Owner Name</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
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
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button
                            type='submit'
                            disabled={!isValid || isSubmitting || isLoading}
                        >
                            Save
                        </Button>
                    </CardFooter>
                </Card>
            </form>

        </Form>
    )
}

export default OwnerRegister