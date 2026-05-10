"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./markdownPage.module.css";

type PageMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

function MarkdownPage() {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "home";
    const capitalized = page.charAt(0).toUpperCase() + page.slice(1);
    const [markdown, setMarkdown] = useState("");
    const title = page ? page.replace(/-/g, " ") : "No page selected";

    useEffect(() => {
        fetch(`/pages/${capitalized}.md`)
            .then((res) => (res.ok ? res.text() : ""))
            .then((text) => setMarkdown(text));
    }, [page]);

    if (!markdown)
        return <p className={styles.pageNotFound}>Page not found.</p>;

    return (
        <article className={styles.article}>
            <p className={styles.fileTitle}>{title}</p>
            <ReactMarkdown
                components={{
                    hr() {
                        return <hr className={styles.divider} />;
                    },
                    img({ src, alt }) {
                        const url = new URL(
                            typeof src === "string" ? src : "",
                            "http://x"
                        );
                        const width = url.searchParams.get("width") ?? "100%";
                        const height = url.searchParams.get("height") ?? "auto";
                        const cleanSrc =
                            (typeof src === "string" ? src : "").split(
                                "?"
                            )[0] ?? "";

                        return (
                            <img
                                src={cleanSrc}
                                alt={alt ?? ""}
                                style={{ width, height, objectFit: "cover" }}
                            />
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </article>
    );
}

export default MarkdownPage;
