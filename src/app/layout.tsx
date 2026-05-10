import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/_components/navbar/Navbar";
import { Suspense } from "react";
import { getPageStructure } from "@/lib/getPageStructure";

export const metadata: Metadata = {
    title: "olena kompletova",
    description: "Multidisciplinary artist and translator.",
    keywords: [
        "Olena Kompletova",
        "multidisciplinary artist",
        "translator",
        "personal artworks",
        "projects",
        "portfolio",
    ],
    openGraph: {
        type: "website",
        url: "https://o-kompletova-portfolio.vercel.app/",
        title: "Olena Kompletova - Portfolio",
        description: "Multidisciplinary artist and translator.",
        images: [
            { url: "https://o-kompletova-portfolio.vercel.app/thumbnail.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "https://o-kompletova-portfolio.vercel.app/",
        title: "Olena Kompletova - Portfolio",
        description: "Multidisciplinary artist and translator.",
        images: ["https://o-kompletova-portfolio.vercel.app/thumbnail.png"],
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await getPageStructure();
    return (
        <html lang="en">
            <body>
                <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Navbar categories={categories} />
                        {children}
                    </Suspense>
                </main>
            </body>
        </html>
    );
}
