import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AM Store | Users Dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
            <html lang="en">

                <body className={font.className}>
                    <div className=" flex items-start justify-between bg-whiten dark:bg-black ">
                        <main className="bg-white dark:bg-black w-full z-9 " >
                            {children}
                        </main>
                    </div>
                </body>
            </html>

    );
}
