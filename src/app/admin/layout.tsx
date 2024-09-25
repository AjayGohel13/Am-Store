import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AM Store | Admin Dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html lang="en">

                <body className={font.className}>
                    <div className=" flex items-start bg-white dark:bg-zinc-800 ">
                        <main className="bg-whiten dark:bg-zinc-950 bg-white w-full z-9 px-5 " >
                            {children}
                        </main>
                    </div>
                </body>
            </html>

    );
}
