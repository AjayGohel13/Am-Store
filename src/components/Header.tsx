import ProductNavbar from './ProductNavbar'
import Navigation from './Navbar'
import { db } from '@/lib/db'

const Header = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return (
    <header className=' sticky top-0 bg-gray-100 dark:bg-neutral-900 px-4 pt-2  z-50 '>
      <div className="max-w-screen-2xl mx-auto  ">
        <div className="  ">
          <div className=' w-full'>
            <Navigation />
          </div>
          <div className=' w-full'>
            <ProductNavbar data={categories} />
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header
