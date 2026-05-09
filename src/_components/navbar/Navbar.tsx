"use client";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { NavCategory } from "@/lib/getPageStructure";
import { useActivePage } from "@/hooks/useActivePage";

export default function Navbar({ categories }: { categories: NavCategory[] }) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const { activePage, setActivePage } = useActivePage();
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        console.log(expandedCategories);
    }, [expandedCategories]);

    const onCategoryClick = (slug: string) =>
        setExpandedCategories((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        );

    const onArrowClick = (e: React.MouseEvent<HTMLImageElement>) =>
        setIsNavbarVisible((prev) => !prev);

    return (
        <nav
            className={
                styles.container + (isNavbarVisible ? "" : " " + styles.hidden)
            }
        >
            <h1 className={styles.title}>
                {"Olena "}
                <br className={styles.break} />
                Kompletova
            </h1>
            <div className={styles.tableOfContents}>
                <ul className={styles.categories}>
                    {categories.map((category) => {
                        const isExpanded = expandedCategories.includes(
                            category.slug
                        );
                        return (
                            <li key={category.slug} className={styles.category}>
                                <button
                                    onClick={() =>
                                        onCategoryClick(category.slug)
                                    }
                                    className={styles.categoryButton}
                                >
                                    <span className={styles.categoryTitle}>
                                        {category.name}
                                    </span>
                                    <span
                                        className={
                                            styles.categoryIcon +
                                            (isExpanded
                                                ? " " + styles.expanded
                                                : "")
                                        }
                                    >
                                        v
                                    </span>
                                </button>
                                <ul
                                    className={
                                        styles.pages +
                                        (isExpanded
                                            ? " " + styles.expanded
                                            : "")
                                    }
                                >
                                    {category.pages.map((page) => (
                                        <li
                                            key={page.slug}
                                            className={
                                                styles.pageLink +
                                                (activePage === page.slug
                                                    ? " " + styles.activePage
                                                    : "")
                                            }
                                            onClick={() =>
                                                setActivePage(page.slug)
                                            }
                                        >
                                            {page.name}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <img
                src="/arrow.svg"
                alt="arrow"
                className={
                    styles.arrowIcon +
                    (isNavbarVisible ? "" : " " + styles.expanded)
                }
                onClick={onArrowClick}
            />
        </nav>
    );
}
