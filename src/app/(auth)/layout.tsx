import Header from "@/components/Header"
type props = {
    children: React.ReactNode
}

const Dashboardlayout = ({ children }: props) => {
    return (
        <div className="w-full bg-whiten dark:bg-black ">
            <Header />
            {children}
        </div>
    )
}

export default Dashboardlayout


