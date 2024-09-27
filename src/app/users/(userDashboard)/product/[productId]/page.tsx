import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TitleForm from "./components/title-form";
import DescriptionForm from "./components/description-form";
import ImageForm from "./components/image-form";
import FeatureForm from "./components/Feature-form";
import BrandForm from "./components/brand-form";
import PriceForm from "./components/price-form";
import { PackageSearch } from "lucide-react";
import VariantForm from "./components/variant-form";
import StockForm from "./components/stock-form";
import Action from "./components/Action";
import SubCategoryForm from "./components/sub-category-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusForm from "./components/status-form";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
    params: {
        productId: string;
    }
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { productId } = params;

    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        return {
            title: 'Product not found | AM Store',
        };
    }

    return {
        title: `${product.title} creation | AM Store`,
    };
}


const page = async ({ params }: Props) => {

    const { userId } = auth()
    if (!userId) {
        return redirect('/sign-in')
    }

    const store = await db.store.findUnique({
        where: {
            userId: userId!,
            isVerified: true,
        }
    })
    if (!store) {
        return redirect("/")
    }

    const product = await db.product.findUnique({
        where: {
            id: params.productId,
            userId,
        },
        include: {
            images: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if (product?.userId === userId || userId === "user_2kTVn4qdUp8OwUM8ZtRP7CTdNPr") {
        console.log("welcome")
    } else {
        return redirect("/");
    }

    if (!product) {
        return redirect("/")
    }
    const requiredFields = [
        product.title,
        product.description,
        product.price,
        product.categoryId,
        product.images.some(image => image),
        product.features,
        product.brand,
    ]
    const total = requiredFields.length;
    const completed = requiredFields.filter(Boolean).length;

    const Brand_option1 = await db.product.findMany({
        where:{
            isVerified:true,
        },
        select:{
            brand:true,
        }
    })

    const subCategories = await db.subCategory.findMany({
        where: {
            categoryId: product.categoryId,
        }
    })

    const Variant_Options = [
        {
            label: "Black",
            value: "Black",
        },
        {
            label: "White",
            value: "White",
        },
        {
            label: "Red",
            value: "Red",
        },
        {
            label: "Gray",
            value: "Gray",
        },
        {
            label: "Green",
            value: "Green",
        },
        {
            label: "Gaming gray",
            value: "Gaming gray",
        },
        {
            label: "Yellow",
            value: "Yellow",
        },
        {
            label: "Blue",
            value: "Blue",
        },
        {
            label: "Violate",
            value: "Violate",
        },
    ]
    const product_status_options = [
        {
            label: "Draft",
            value: "Draft"
        },
        {
            label: "Active",
            value: "Active"
        },
        {
            label: "Archieved",
            value: "Archieved"
        },
    ]
    const completedNumber = `(${completed}/${total})`;
    const isComplete = requiredFields.every(Boolean);
    return (
        <div className="h-full max-w-screen-2xl mx-auto  w-full min-h-screen bg-white dark:bg-black px-5 " >
            <h3 className="font-medium text-black text-3xl dark:text-white mt-5 flex gap-2 items-center ">
                <PackageSearch className=" h-12 w-12 bg-gray-300/35 p-2 rounded-sm " />Product Setup
            </h3>
            <div className=" 'p-6 mx-auto ">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm  shadow-default  dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-zinc-700">
                            <div className=' flex flex-col gap-y-2 ' >
                                <span className=' text-sm text-slate-500' >
                                    Fill up all the following fields {completedNumber}
                                </span>
                            </div>
                        </div>
                        <div>
                            <Card x-chunk="dashboard-07-chunk-0" className="shadow-2xl dark:bg-black dark:border-zinc-700 mt-5">
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>
                                        <span className=' text-sm text-slate-500' >
                                            Fill up all the following fields {completedNumber}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TitleForm
                                        data={product}
                                        productId={product.id}
                                    />
                                    <DescriptionForm
                                        data={product}
                                        productId={product.id}
                                    />
                                    <FeatureForm
                                        data={product}
                                        productId={product.id}
                                    />
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-1" className=" mt-5 shadow-2xl dark:bg-black dark:border-zinc-700">
                                <CardHeader>
                                    <CardTitle>Stock & Other information</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col xl:flex-row items-center gap-3 md:gap-8 justify-around">
                                        <div className=" flex  flex-col md:flex-row justify-around w-full">
                                            <BrandForm
                                                data={product}
                                                productId={product.id}
                                                options={Brand_option1.map((brands) => ({
                                                    label: brands.brand!,
                                                    value: brands.brand!,
                                                }))}
                                            />
                                            <StockForm
                                                data={product}
                                                productId={product.id}
                                            />
                                        </div>
                                        <div className="flex  flex-col md:flex-row justify-around w-full">
                                            <PriceForm
                                                data={product}
                                                productId={product.id}
                                            />
                                            <VariantForm
                                                data={product}
                                                productId={product.id}
                                                options={Variant_Options.map((brands) => ({
                                                    label: brands.label,
                                                    value: brands.value,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-2" className=" mt-5 shadow-2xl dark:bg-black dark:border-zinc-700">
                                <CardHeader>
                                    <CardTitle>Product Categories and archievs of product</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row  justify-around w-full">
                                        <div className="w-full">
                                            <SubCategoryForm
                                                data={product}
                                                productId={product.id}
                                                options={subCategories.map((subCat) => ({
                                                    label: subCat.name,
                                                    value: subCat.id,
                                                }))}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <StatusForm
                                                data={product}
                                                productId={product.id}
                                                options={product_status_options.map((subCat) => ({
                                                    label: subCat.label,
                                                    value: subCat.value,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="p-6.5">
                                <div className="mb-6 -z-10 ">
                                    <ImageForm
                                        data={product}
                                        productId={product.id}
                                    />
                                </div>
                                <Action
                                    id={product.id}
                                    disabled={!isComplete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page