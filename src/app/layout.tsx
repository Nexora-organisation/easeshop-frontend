import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import {SessionProvider} from "next-auth/react";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import {Toaster} from 'react-hot-toast';


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ease shop",
    description: "ease shop",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
            <ReactQueryProvider>
                <Toaster/>
                <NavBar/>
                {children}
                <Footer/>
            </ReactQueryProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
