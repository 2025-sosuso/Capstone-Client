'use client'

import "@styles/globals.css";
import Layout from "@components/layout";

import { AuthProvider } from "@/contexts/AuthContext";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <Layout>{children}</Layout>
        </AuthProvider>
        </body>
        </html>
    );
}