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
            <h1 className={styles.title}>
                Olena
                <br />
                Kompletova
            </h1>
            <ul className={styles.categories}>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("about")}
                        className={styles.categoryButton}
                    >
                        <span className={styles.categoryTitle}>About</span>
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
                    <ul
                        className={
                            styles.pages +
                            (selectedCategories.includes("about")
                                ? " " + styles.expanded
                                : "")
                        }
                    >
                        <li className={styles.pageLink}>Education</li>
                        <li className={styles.pageLink}>Experience</li>
                        <li className={styles.pageLink}>Skills</li>
                    </ul>
                </li>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("projects")}
                        className={styles.categoryButton}
                    >
                        <span className={styles.categoryTitle}>Projects</span>
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
                    <ul
                        className={
                            styles.pages +
                            (selectedCategories.includes("projects")
                                ? " " + styles.expanded
                                : "")
                        }
                    >
                        <li className={styles.pageLink}>Project 1</li>
                        <li className={styles.pageLink}>Project 2</li>
                        <li className={styles.pageLink}>Project 3</li>
                    </ul>
                </li>
                <li className={styles.category}>
                    <button
                        onClick={() => onCategoryClick("contact")}
                        className={styles.categoryButton}
                    >
                        <span className={styles.categoryTitle}>Contact</span>
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
                    <ul
                        className={
                            styles.pages +
                            (selectedCategories.includes("contact")
                                ? " " + styles.expanded
                                : "")
                        }
                    >
                        <li className={styles.pageLink}>Email</li>
                        <li className={styles.pageLink}>Substack</li>
                        <li className={styles.pageLink}>GitHub</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
