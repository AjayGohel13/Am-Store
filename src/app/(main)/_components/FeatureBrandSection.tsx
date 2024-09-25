import Image from 'next/image'
import React from 'react'

type Props = {}


const FeatureBrandSection = (props: Props) => {
  const img = [
    {image:"/logo/ck.png"},
    {image:"/logo/ga.png"},
    {image:"/logo/given.png"},
    {image:"/logo/Levis.png"},
    {image:"/logo/samsung.png"},
  ]
  return (
    <div className=' flex flex-row flex-wrap justify-around items-center dark:bg-gray-500 mt-4 rounded-md'>
      {img.map((images)=>(
        <Image
          src={images.image}
          key={images.image}
          height={150}
          className=''
          width={150}
          alt='Brand images'
        />
      ))}
    </div>
  )
}

export default FeatureBrandSection