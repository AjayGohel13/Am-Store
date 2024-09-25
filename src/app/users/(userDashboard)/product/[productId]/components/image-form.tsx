"use client"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ImageIcon, List, Loader, PlusCircleIcon, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Images, Product } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  })
})
type Props = {
  data: Product & { images: Images[] };
  productId: string
}

const ImageForm = ({ data, productId }: Props) => {

  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const toggleCreating = () => setIsCreating((current) => !current)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/product/${productId}/image`, values)
      toast.success("Image updated successfully")
      toggleCreating()
      router.refresh()
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }

  const onDelete = async (id: string) => {
    try {
      setIsUpdating(true)
      await axios.delete(`/api/product/${productId}/image/${id}`)
      toast.message("Product image deleted");
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="relative mt-5 bg-none dark:text-whiten text-black-2 rounded-md p-4">
      {isUpdating && (
        <div className=" absolute h-full w-full bg-neutral-700/60 top-0 left-0 rounded-m flex items-center justify-center">
          <Loader className=" h-5 w-5 animate-spin dark:text-whiten text-black-2" />
        </div>
      )}
      <div className=" font-medium flex items-center justify-between">
        <div className=" flex items-center gap-3">
          <List className=" h-12 w-12 bg-gray-300/35 p-2 rounded-sm dark:text-white " />
          <p className="hidden sm:block">
            Images 
          </p>
        </div>
        <Button onClick={toggleCreating} variant='ghost' className=" dark:bg-slate-900 bg-slate-100 text-black dark:text-white">
          {isCreating && (
            <>Cancel</>

          )}
          {!isCreating && (
            <>
              <PlusCircleIcon className=" h-4 w-4 mr-2" />
              Add an Image
            </>
          )}

        </Button>

      </div>
      {isCreating && (
        <div>
          <FileUpload
            endpoint="productImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4 ">
            4:4 aspect ratio recommended
          </div>
        </div>
      )}
      {!isCreating && (
        <div className={cn(
          " text-sm mt-2",
          !data.images.length && " text-whiter italic"
        )}>
          {!data.images.length && (
            <div className=" flex items-center justify-center h-60 bg-slate-400 rounded-md">
              <ImageIcon className=" h-10 w-10 text-slate-700" />
            </div>
          )}
          <div className="flex justify-start gap-4 items-center">

            {data.images.map((image) => (
              <div className=" mt-2 gap-2 flex justify-start flex-col items-center" key={image.id}>
                <Image
                  src={image.imageUrl}
                  alt="Product image"
                  className=" aspect-square h-30 w-30"
                  height={100}
                  width={100}
                />
                <Button onClick={() => onDelete(image.id)} className=" bg-rose-400 hover:bg-rose-500 " size="icon" ><Trash2 /></Button>
              </div>
            ))}
          </div>


        </div>
      )}
    </div>
  )
}

export default ImageForm