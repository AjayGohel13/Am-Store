// "use client"
// import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
// import { Button } from './ui/button'
// import { useRouter } from 'next/navigation'
// import { useUser } from '@clerk/nextjs'
// import { toast } from './ui/use-toast'
// import Link from 'next/link'
// import { User } from 'lucide-react'

// type Props = {}

// const MenuItemData = (props: Props) => {
//     const router = useRouter()
//     const { user } = useUser()
//     const onClick = () => {
//         if(!user?.id){
//             toast({
//                 title: "You need to sign-in first",
//                 action: (
//                     <Link href="/sign-in">
//                         <Button variant="cart">
//                             Sign-In
//                         </Button>
//                     </Link>
//                 ),
//             })
//         }
//     }
//     return (

//     )
// }

// export default MenuItemData