import Image from "next/image";
import styles from "./page.module.css";
import MarkdownPage from "@/_components/markdownPage/MarkdownPage";

export default function Home() {
    return (
        <div className={styles.page}>
            <MarkdownPage />
        </div>
    );
}
