"use client";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        console.log(selectedCategories);
    }, [selectedCategories]);

    const onCategoryClick = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
            );
            return;
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <nav className={styles.container}>
            <ul className={styles.categories}>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("about")}
                        className={styles.categoryButton}
                    >
                        About
                        <span
                            className={
                                styles.categoryIcon +
                                (selectedCategories.includes("about")
                                    ? " " + styles.expanded
                                    : "")
                            }
                        >
                            v
                        </span>
                    </button>
                </li>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("projects")}
                        className={styles.categoryButton}
                    >
                        Projects
                        <span
                            className={
                                styles.categoryIcon +
                                (selectedCategories.includes("projects")
                                    ? " " + styles.expanded
                                    : "")
                            }
                        >
                            v
                        </span>
                    </button>
                </li>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("contact")}
                        className={styles.categoryButton}
                    >
                        Contact
                        <span
                            className={
                                styles.categoryIcon +
                                (selectedCategories.includes("contact")
                                    ? " " + styles.expanded
                                    : "")
                            }
                        >
                            v
                        </span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
