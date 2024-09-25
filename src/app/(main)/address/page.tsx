import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { SignupFormDemo } from './_components/form'

type Props = {}

const page = (props: Props) => {
  return (
    <MaxWidthWrapper className=' mt-10 p-5'>
      <SignupFormDemo/>
    </MaxWidthWrapper>
  )
}

export default page