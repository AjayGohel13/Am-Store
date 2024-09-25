"use client"
import { Product } from '@prisma/client';
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ListPlus, Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';

const formSchema = z.object({
  features: z.string().min(1, {
    message: "Features is required",
  })
})
type Props = {
  data: Product;
  productId: string
}

const FeatureForm = ({ data, productId }: Props) => {

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: data?.features || ""
    }
  })

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/product/${productId}`, value)
      toast.message("Feature updated successfully")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }
  return (
    <div className=" mt-6 bg-none dark:text-white text-black rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <ListPlus className="h-12 w-12 bg-gray-300/35 p-2 rounded-sm " /> 
          <p className="hidden sm:block">
            Product Features
          </p>
        </div>
        <Button onClick={toggleEdit} variant='ghost' className=" dark:bg-slate-900 bg-slate-100 text-black dark:text-white">
          {isEditing && (
            <>Cancel</>

          )}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit features
            </>
          )}

        </Button>

      </div>
      {!isEditing && (
        <div className={cn(
          " text-sm mt-2",
          !data.features && " text-slate-500 italic"
        )}>
          {!data.features && " No Features"}
          {data.features && (
            <Preview
              value={data.features}
            />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
              <Button
                disabled={isSubmitting}
                className=" text-white dark:bg-neutral-600  dark:hover:bg-neutral-500"  >
                Save
              </Button>
            </div>

          </form>
        </Form>
      )}
    </div>)
}

export default FeatureForm