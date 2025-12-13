'use client'

import {AuthProvider} from "@/contexts/AuthContext";
import {CompareProvider} from "@/contexts/CompareContext";

export function Provider({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CompareProvider>
                {children}
            </CompareProvider>
        </AuthProvider>
    )
}
