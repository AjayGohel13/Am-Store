"use client"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {   Layers,  Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Product } from "@prisma/client"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  stock: z.coerce.number(),
})
type Props = {
  data: Product;
  productId: string
}

const StockForm = ({ data, productId }: Props) => {

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: data?.stock || undefined
    }
  })

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/product/${productId}`, values)
      toast.success("Product stock updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went Wrong!")
    } finally {
      setIsLoading(false)

    }
  }
  return (
    <div className=" mt-6 border-gray-500 bg-none dark:text-white text-black rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Layers className="h-12 w-12 bg-gray-300/35 p-2 rounded-sm " />  
          <p className="hidden sm:block">
            Stock 
          </p>
        </div>
        <Button onClick={toggleEdit} variant='ghost' className="dark:bg-slate-900 bg-slate-100 text-black dark:text-white">
          {isEditing && (
            <>Cancel</>

          )}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Stock
            </>
          )}

        </Button>

      </div>
      {!isEditing && (
        <p className={cn(
          " text-sm mt-2 dark:bg-zinc-800 bg-zinc-200 p-3 rounded-md",
          !data.stock && " text-slate-500 italic"
        )}>
          {data.stock
            ? data.stock : "No stock"}
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
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Stock of your product"
                      className="dark:bg-zinc-900 bg-slate-200 border-none text-black-2 dark:text-white "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2 ">
              <Button
                disabled={isLoading && isSubmitting && isValid}
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

export default StockForm