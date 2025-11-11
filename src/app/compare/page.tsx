import Compare from "@components/compare";
import {Suspense} from "react";

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
        }>
            <Compare />
        </Suspense>
    );
}