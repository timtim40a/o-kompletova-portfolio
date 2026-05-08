import { readdir } from "fs/promises";
import path from "path";

export type NavPage = { name: string; slug: string };
export type NavCategory = { name: string; slug: string; pages: NavPage[] };

const PAGES_DIR = path.join(process.cwd(), "public", "pages");

function toDisplayName(stem: string): string {
    return stem.replace(/[_-]/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export async function getPageStructure(): Promise<NavCategory[]> {
    const categoryEntries = await readdir(PAGES_DIR, { withFileTypes: true });

    return Promise.all(
        categoryEntries
            .filter((e) => e.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(async (dir): Promise<NavCategory> => {
                const categorySlug = dir.name.toLowerCase();
                const files = await readdir(path.join(PAGES_DIR, dir.name), {
                    withFileTypes: true,
                });
                return {
                    name: dir.name,
                    slug: categorySlug,
                    pages: files
                        .filter((f) => f.isFile() && f.name.endsWith(".md"))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((f) => {
                            const stem = path.basename(f.name, ".md");
                            return {
                                name: toDisplayName(stem),
                                slug: `${categorySlug}/${stem}`,
                            };
                        }),
                };
            })
    );
}
