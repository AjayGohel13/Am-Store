"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster as Toast } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { dark } from '@clerk/themes'
import { ThemeProvider, useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
    }}
 
    >
      <TooltipProvider>

        <html lang="en" suppressHydrationWarning>
          <body className={` dark:bg-black ${inter.className}`}>
            <NextTopLoader />

            <ThemeProvider
              enableSystem={false}
              attribute="class"
              defaultTheme="light"
            >
              <main className="w-full">
                <div className="mx-auto">
                  {children}
                </div>
              </main>
            </ThemeProvider>
            <Toast />
            <Toaster/>
            <Footer/>
          </body>

        </html>
      </TooltipProvider>

    </ClerkProvider>

  );
}
