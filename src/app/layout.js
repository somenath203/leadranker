import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ClientWrapper from "./_components/shared-components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({subsets: ['latin']});


export const metadata = {
  title: "LeadRanker",
  description: "An AI-powered tool that helps companies find and rank top developer candidates based on their GitHub profiles and skills.",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">

      <html lang="en" suppressHydrationWarning>

        <body
          className={`${inter.className} antialiased`}
        >
          <ClientWrapper>
            
            {children}

          </ClientWrapper>

          <Toaster 
            richColors
            position='bottom-center'
            theme='light'
          />
          
        </body>

      </html>

    </ClerkProvider>
  );
}
