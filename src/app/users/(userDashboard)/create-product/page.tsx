import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Creationform from "./_component/creation-form"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
type Props = {}
const page = async (props: Props) => {
    const {userId} = auth()
    const category = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    const store = await db.store.findUnique({
        where:{
            userId:userId!,
            isVerified:true,
        }
    })
    if(!store){
        return redirect("/")
    }
    return (
        <div className=' bg-white dark:bg-black my-20 w-full mx-auto max-w-screen-2xl flex md:items-center md:justify-center h-full p-6' >
            <div className=' w-full'>
                <h1 className=' text-2xl text-black-2 dark:text-slate-100 mb-4 '>
                    Name your product
                </h1>
                <p className=' text-sm text-slate-600 mb-4'>
                    Enter the name of you&apos;r product.You can change it later
                </p>
                <Card x-chunk="dashboard-07-chunk-0" className=" dark:bg-black dark:border-zinc-700">
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Creationform
                            options={category.map((subCat) => ({
                                label: subCat.name,
                                value: subCat.id,
                            }))}
                        />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default page