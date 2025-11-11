'use client'

import "@styles/globals.css";
import Layout from "@components/layout";

import {AuthProvider} from "@/contexts/AuthContext";
import {CompareProvider} from "@/contexts/CompareContext";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <CompareProvider>
                <Layout>{children}</Layout>
            </CompareProvider>
        </AuthProvider>
        </body>
        </html>
    );
}