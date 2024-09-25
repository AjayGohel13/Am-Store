"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ChartColumnStacked, Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Product } from "@prisma/client"
import { SelectForVariant } from "@/components/select"

type Props = {
  data: Product;
  productId: string;
  options: { label: string; value: string }[]
}
const formSchema = z.object({
  categoryId: z.string().min(1)
})

const CategoryForm = ({ data, productId, options }: Props) => {

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: data?.categoryId || ""
    }
  })

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/product/${productId}`, values)
      toast.info("Product category updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }

  const selectedOptions = options.find((option) => (option.value === data.categoryId));
  return (
    <div className=" mt-6 border-gray-500 bg-none dark:text-whiten text-black-2 rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <ChartColumnStacked className="h-12 w-12 bg-gray-300/35 text-black dark:text-white p-2 rounded-sm " /> Product Category
        </div>
        <Button onClick={toggleEdit} variant='ghost' className=" dark:bg-slate-900 bg-slate-100 text-black dark:text-white" disabled={isSubmitting}>
          {isEditing && (
            <>Cancel</>

          )}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit category
            </>
          )}

        </Button>

      </div>
      {!isEditing && (
        <p className={cn(
          " text-sm mt-2 dark:bg-gray-800 bg-gray-200 p-3 rounded-md dark:text-white text-black",
          !data.categoryId && " text-slate-500 italic"
        )}>
          {selectedOptions?.label || " No Category"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
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
            <div className=" flex items-center gap-x-2">
              <Button
                disabled={isSubmitting && isValid}
                className=" text-white dark:bg-neutral-600  dark:hover:bg-neutral-500" >
                Save
              </Button>
            </div>

          </form>
        </Form>
      )}
    </div>
  )
}

export default CategoryForm