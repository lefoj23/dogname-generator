"use client";
import { motion } from "motion/react";
import styles from "./split-text.module.scss";

type Props = {
  text: string;
  className?: string;
};

export default function SplitText({ text, className }: Props) {
  const lines = text.split("\n");

  return (
    <motion.h1 className={className} aria-label={text}>
      {lines.map((line, li) => (
        <div key={li} className={styles.line}>
          {line.split("").map((char, i) => {
            const key = `${li}-${i}-${char}`;
            const isSpace = char === " ";
            return (
              <motion.span
                key={key}
                className={styles.char}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: (li * line.length + i) * 0.03 }}
                aria-hidden={true}
              >
                {isSpace ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </div>
      ))}
    </motion.h1>
  );
}
