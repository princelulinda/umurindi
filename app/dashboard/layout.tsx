import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarComponent from "@/components/sidebar";
import Navbar from "@/components/navbar";
import NextTopLoader from 'nextjs-toploader';
import { RequireAuth, Setup } from "@/components/utils";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Umurindi App",
    description: "Application de gestion Umurindi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="fr" className="h-full">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
            >
                <RequireAuth>
                    <SidebarProvider >
                        <div className="flex h-full">
                            <SidebarComponent />
                            <div className="flex-1 md:ml-[5%] flex flex-col">
                                <Navbar />
                                <main className="pt-16 px-4 sm:px-8 overflow-auto flex-1">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </SidebarProvider>
                </RequireAuth>

            </body>
        </html>
    );
}
