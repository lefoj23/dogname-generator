"use client";
import dog1 from "../../assets/dog-1.png";
import styles from "./page.module.scss";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useLettersDriveData } from "../../hooks/useLettersDriveData";
import { useAppSelector } from "../../store/hooks";

export default function Body() {
  const isMobile = useIsMobile();
  const loading = useAppSelector((state) => state.letters.isLoading);
  const error = useAppSelector((state) => state.letters.error);

  if (loading || error) return null;

  return (
    <div
      className={
        styles.pageWrapper +
        (isMobile
          ? ` flex flex-row items-center justify-center w-100 ${styles.mobile}`
          : ` flex flex-col items-center justify-center h-auto w-100`)
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
