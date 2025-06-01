import Search from "@components/search";
import {Suspense} from "react";

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Search/>
        </Suspense>
    );
}

