"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Captions, Pencil } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
})
type Props = {
  data: {
    title: string
  };
  productId: string
}

const TitleForm = ({ data, productId }: Props) => {

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  })

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/product/${productId}`, values)
      toast.info("Product title updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }
  return (
    <div className=" mt-6 dark:text-white text-black rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Captions className="h-12 w-12 bg-gray-300/35 p-2 rounded-sm " />
           <p className="hidden sm:block">
            Product Title
          </p>
        </div>
        <Button onClick={toggleEdit} variant='ghost' className=" dark:bg-slate-900 bg-slate-100 text-black dark:text-white">
          {isEditing && (
            <>Cancel</>

          )}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Title
            </>
          )}

        </Button>

      </div>
      {!isEditing && (
        <p className=" text-sm mt-2 dark:bg-zinc-800 bg-zinc-200 p-3 rounded-md">
          {data.title}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Electronics items, fashion and many more'"
                      className="dark:bg-zinc-900 bg-slate-200 border-none text-black-2 dark:text-white "
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