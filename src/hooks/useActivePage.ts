"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useActivePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activePage = searchParams.get("page") ?? null;

    const setActivePage = useCallback(
        (slug: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", slug);
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    return { activePage, setActivePage };
}
