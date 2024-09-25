import Header from "@/components/Header"
import { Metadata } from "next"
type props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "AM Store | Online shopping site for Electronics, Furniture, and Much more",
};
const Dashboardlayout = ({ children }: props) => {
    return (
        <html lang="en">
            <body>
                <div className="w-full bg-whiten dark:bg-black ">
                    <Header />
                    {children}
                </div>
            </body>
        </html>
    )
}

export default Dashboardlayout


