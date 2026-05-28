"use client";
import dog1 from "../../assets/dog-1.png";
import styles from "./page.module.scss";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function Body() {
  const isMobile = useIsMobile();

  return (
    <div
      className={
        styles.pageWrapper +
        (isMobile
          ? ` flex flex-row items-center justify-center w-100 ${styles.mobile}`
          : ` flex flex-col items-center justify-center h-auto w-100 mt-4`)
      }
    >
      <h1 className={`text-2xl font-bold ${isMobile && styles.mobile}`}>
        I NEED
        <br />A NAME
      </h1>
      <img
        src={dog1.src}
        alt="Dog"
        className={`${isMobile && styles.mobile}`}
      />
    </div>
  );
}
