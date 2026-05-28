"use client";
import dog1 from "../../assets/dog-1.png";
import dog2 from "../../assets/dog-2.png";
import styles from "./page.module.scss";
import SplitText from "../../components/SplitText";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppSelector } from "../../store/hooks";
import { motion, AnimatePresence } from "motion/react";
import { useNamesDriveData } from "@/app/hooks/useNamesDriveData";
import { JSX, useState, useEffect } from "react";

export default function Body() {
  const { data } = useNamesDriveData();

  const isMobile = useIsMobile();
  const loading = useAppSelector((state) => state.letters.isLoading);
  const error = useAppSelector((state) => state.letters.error);
  const selectedLetter = useAppSelector(
    (state) => state.letters.selectedLetter,
  );
  const [selectedNameIndex, setSelectedNameIndex] = useState<number | null>(
    null,
  );
  const [nameElements, setNameElements] = useState<JSX.Element[]>([]);

  const LandingPage = () => {
    return (
      <div
        className={
          styles.pageWrapper +
          (isMobile
            ? ` flex flex-row items-center justify-center w-100 ${styles.mobile}`
            : ` flex flex-col items-center justify-center h-auto w-100`)
        }
      >
        <SplitText
          text={`I NEED\nA NAME`}
          className={`text-2xl font-bold ${isMobile && styles.mobile}`}
        />
        <img
          src={dog1.src}
          alt="Dog"
          className={`${isMobile && styles.mobile}`}
        />
      </div>
    );
  };

  const renderNames = (index: number | null) => {
    const items: JSX.Element[] = [];

    let startIndex = index ?? 0;
    let endIndex = startIndex + 7;
    let selectedIndex = startIndex + 3;

    if (index != null && typeof index === "number") {
      selectedIndex = index;
      startIndex = Math.max(0, selectedIndex - 3);
      endIndex = Math.min(startIndex + 7, data?.data.length ?? 0);

      if (endIndex - startIndex < 7) {
        startIndex = Math.max(0, endIndex - 7);
      }
    }

    setSelectedNameIndex(selectedIndex);

    let count = 0;
    for (let i = startIndex; i < endIndex; i++) {
      items.push(
        <li
          key={data?.data[i]?.id ?? `name-${i}`}
          className={`${styles.nameItem} ${selectedIndex === i ? styles.isSelected : ""} cursor-pointer ${styles[`nameIndex-${count}`]}`}
          onClick={() => JumpToName(i, selectedIndex)}
        >
          {data?.data[i]?.title}
        </li>,
      );
      count++;
    }
    setNameElements(items);
  };

  const JumpToName = (targetIndex: number, currentIndex: number | null) => {
    if (currentIndex === null || currentIndex === targetIndex) {
      return;
    }

    const step = targetIndex > currentIndex ? 1 : -1;
    const nextIndex = currentIndex + step;

    renderNames(nextIndex);

    if (nextIndex !== targetIndex) {
      setTimeout(() => JumpToName(targetIndex, nextIndex), 200);
    }
  };

  useEffect(() => {
    if (selectedLetter) {
      let letterIndex =
        data?.data.findIndex((name) =>
          name.title.startsWith(selectedLetter ?? "a"),
        ) ?? null;
      setSelectedNameIndex(letterIndex);
      renderNames(letterIndex);
    }
  }, [selectedLetter]);

  if (loading || error) return null;
  return (
    <>
      {selectedLetter == null ? (
        LandingPage()
      ) : (
        <div
          className={
            styles.pageWrapper +
            (isMobile
              ? ` flex flex-row items-center justify-center w-100 ${styles.mobile}`
              : ` flex flex-col items-center justify-center h-auto w-100`)
          }
        >
          <div className="flex flex-row items-center justify-center w-100">
            <img
              src={dog2.src}
              alt="Dog"
              className={`${isMobile && styles.mobile} ${styles.dogImage2}`}
            />
            <ul className="w-2/5">{nameElements}</ul>

            <div className="flex flex-col items-center justify-center w-100 w-1/5">
              <i
                className={
                  "pi pi-angle-up text-2xl items-center primary cursor-pointer h-1/4" +
                  styles.arrowIcon
                }
                style={{
                  color: "var(--primary-color)",
                  fontSize: "3.5rem",
                  fontWeight: "200",
                }}
                onClick={() => {
                  selectedNameIndex !== null && selectedNameIndex > 0
                    ? renderNames(selectedNameIndex - 1)
                    : null;
                }}
              />
              <div className="block h-100"></div>
              <i
                className={
                  "pi pi-angle-down text-2xl items-center primary cursor-pointer h-1/4" +
                  styles.arrowIcon
                }
                style={{
                  color: "var(--primary-color)",
                  fontSize: "3.5rem",
                  fontWeight: "200",
                }}
                onClick={() => {
                  selectedNameIndex !== null &&
                  selectedNameIndex < (data?.data.length ?? 0) - 1
                    ? renderNames(selectedNameIndex + 1)
                    : null;
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
