import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/lib/db'
import { Clock, IdCard, Receipt, Truck } from 'lucide-react'
import ProductList from '@/components/Hero/product-list'
import CustomProd from './_components/custom-card-selling'
import ElectronicItem from './_components/electronic-item'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DiscountSection from './_components/Discount-section'
import FeatureBrandSection from './_components/FeatureBrandSection'
import LoginDialog from './_components/LoginDialog'
import { InfiniteMovingCards } from '@/components/Hero/infinit-moving-cards'
import Image from 'next/image'
const page = async () => {
  const productForPage = await db.product.findMany({
    take: 4,
    where: {
      isVerified: true,
      status: "Active"

    },
    orderBy: {
      createdAt: "desc"
    }
  })
  await db.visit.create({
    data: {
      page: ""
    }
  })


  const perks = [
    {
      name: "Fast Delivery",
      Icon: Truck,
      description: "Starts from $10"
    },
    {
      name: "Money Gaurantee",
      Icon: Receipt,
      description: "7 Days Back"
    },
    {
      name: "365 Days",
      Icon: Clock,
      description: "For free return"
    },
    {
      name: "Payment",
      Icon: IdCard,
      description: "Secure System"
    },
  ]

  const categoris = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const productData = await db.product.findMany({
    take: 4,
    where: {
      isVerified: true,
      status: "Active"
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  const clothesProduct = await db.product.findMany({
    take: 4,
    where: {
      categoryId: "7dff3df2-c746-48ad-8750-ac092cd8a0cf",
      isVerified: true,
      status: "Active",
    }
  })


  const electronics = await db.subCategory.findMany({
    where: {
      categoryId: "619dd120-71a7-45e0-bd0b-97242f031e55",
    }
  });


  return (
    <MaxWidthWrapper className=' '>

      <div className="p-5">
        <div className=" py-9 md:py-12 lg:py-24 flex flex-col  ">
          <div className="relative ">
            <Image
              height={400}
              width={600}
              src="/light-main-1.webp"
              alt="A work table with house plants"
              role="img"
              className="w-full h-full dark:hidden hidden lg:block"
            />
            <Image
              height={400}
              width={600}
              src="/dark-main-1.webp"
              alt="A work table with house plants"
              role="img"
              className="w-full h-full hidden dark:lg:block"
            />
            <Image
              height={500}
              width={700}
              src="/light-main-2.png"
              alt="A work table with house plants"
              role="img"
              className="dark:hidden hidden dark:sm:hidden lg:hidden sm:block dark:lg:hidden w-full h-full"
            />
            <Image
              height={500}
              width={700}
              src="/dark-main-2.png"
              alt="A work table with house plants"
              role="img"
              className="dark:sm:block hidden lg:hidden dark:lg:hidden w-full h-full"
            />
            <Image
              height={500}
              width={700}
              src="/light-main-3.png"
              alt="A work table with house plants"
              role="img"
              className="block  sm:hidden  dark:hidden w-full h-full"
            />
            <Image
              height={500}
              width={700}
              src="/dark-main-3.png"
              alt="A work table with house plants"
              role="img"
              className="dark:block hidden dark:sm:hidden w-full h-full"
            />

            <div
              className="absolute z-10 top-0 left-0 mx-4 sm:mx-0 mt-36 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start"
            >
              <h1
                className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white sm:w-8/12"
              >
                Minimalist Furniture Design
              </h1>
              <p
                className="text-sm sm:text-lg leading-normal text-gray-800 dark:text-white mt-4 sm:mt-5 sm:w-5/12"
              >
                Find the latest collections that suit your needs and tastes.
              </p>
              <Link href="/product">
                <Button
                  variant="outline"
                >
                  Explore
                </Button>
              </Link>
            </div>
            <button
              className="absolute bottom-0 sm:hidden dark:bg-white dark:text-gray-800 bg-gray-800 py-4 text-base font-medium text-white mt-8 flex justify-center items-center w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700"
            >
              Explore
            </button>
          </div>
          <div className=' mt-10 md:flex  gap-x-10  justify-center bg-white dark:bg-zinc-900  p-5 '>
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 sm:gap-x-20 xl:gap-x-32 lg:gap-y-0">
              {perks.map((perk) => (
                <div key={perk.name} className="  text-center flex flex-row bg-white dark:bg-zinc-900 lg:text-center border border-gray-400 rounded-md p-3">
                  <div className="md:flex-shrink-0 flex  justify-center">
                    <div className="justify-center h-16 w-16 flex items-center rounded-full text-gray-600 ">
                      {<perk.Icon className='w-1/3 h-1/3 scale-150' />}
                    </div>
                  </div>
                  <div className="md:ml-4 md:mt-0 lg:ml-0 text-start ">
                    <h3 className="text-xl font-semibold  text-gren-900">
                      {perk.name}
                    </h3>
                    <p className="mt-1 text-medium  text-muted-foreground">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=' mt-10'>
            <InfiniteMovingCards
              items={categoris}
              direction='right'
              speed='slow'
            />
          </div>
          <div className=' px-5'>
            <LoginDialog />
          </div>

          <div className=' flex flex-col ' id='best_deals'>
            <h1 className=' text-red-400 text-2xl font-bold px-8 mt-5 '>
              Deals of the Day
            </h1>
            <ProductList
              items={productData}
            />
          </div>


          <div className=' mt-5'>
            <CustomProd />
          </div>

          <div className=' flex flex-col items-start gap-2 h-full dark:bg-black mt-5 px-5 lg:px-8 rounded-md'>
            <h1 className=' text-2xl dark:text-white text-black font-bold'>Electronics</h1>
            <div className=' flex flex-row gap-4 flex-wrap'>

              {electronics.map((items) => (
                <Button
                  variant="outline"
                  key={items.id}
                  className=' font-semibold hover:text-rose-400 transition-all ease-linear rounded-lg bg-white dark:bg-black'
                  size="lg"
                >
                  <Link href={`/products/category/${items.id}?=${items.name}`}>{items.name}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <ElectronicItem />
          </div>

          <div className=' px-8 mt-5'>
            <DiscountSection />
          </div>
          <div>
            <ProductList
              items={clothesProduct}
            />
          </div>
          <div id='new_arrivals'>
            <h1 className=' text-red-400 text-2xl font-bold px-8 mt-5 '>
              New arrivals
            </h1>

            <ProductList
              items={productForPage!}
            />
          </div>

          <div className=' flex flex-col px-8 mt-8'>
            <h1 className=' text-xl font-bold'>
              Featured Brand
            </h1>
            <FeatureBrandSection />
          </div>

          <div>
          </div>

        </div>
      </div>
    </MaxWidthWrapper>

  )
}
export default page