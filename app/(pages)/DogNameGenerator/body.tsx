"use client";
import dog1 from "../../assets/dog-1.png";
import dog2 from "../../assets/dog-2.png";
import iconLink from "../../assets/icon-link.svg";
import iconMessenger from "../../assets/icon-messenger.svg";
import iconTwitter from "../../assets/icon-twitter.svg";

import styles from "./page.module.scss";
import SplitText from "../../components/SplitText";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppSelector } from "../../store/hooks";
import { motion, AnimatePresence } from "motion/react";
import { useNamesDriveData } from "../../hooks/useNamesDriveData";
import { useCategoriesDriveData } from "../../hooks/useCategoriesDriveData";
import { JSX, useState, useEffect } from "react";
import { INamesData, INamesResponse } from "../../models/names";

export default function Body() {
  const { data: namesData } = useNamesDriveData();
  const { data: categoriesData } = useCategoriesDriveData();

  const isMobile = useIsMobile();
  const loading = useAppSelector((state) => state.letters.isLoading);
  const error = useAppSelector((state) => state.letters.error);
  const selectedLetter = useAppSelector(
    (state) => state.letters.selectedLetter,
  );

  const selectedGender = useAppSelector((state) => state.gender.selectedGender);
  const selectedCategoryIds = useAppSelector(
    (state) => state.category.selectedCategoryIds,
  );

  const [selectedNameIndex, setSelectedNameIndex] = useState<number | null>(
    null,
  );
  const [nameElements, setNameElements] = useState<JSX.Element[]>([]);
  const [loadedNames, setLoadedNames] = useState<INamesResponse | null>(
    namesData,
  );
  const [maxIndexNumber, setMaxIndexNumber] = useState<number>(7);
  const [centerIndexNumber, setCenterIndexNumber] = useState<number>(3);

  const [displayDetailedView, setDisplayDetailedView] =
    useState<boolean>(false);

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
    let endIndex = startIndex + maxIndexNumber;
    let selectedIndex = startIndex + centerIndexNumber;

    if (index != null && typeof index === "number") {
      selectedIndex = index;
      startIndex = Math.max(0, selectedIndex - centerIndexNumber);
      endIndex = Math.min(
        startIndex + maxIndexNumber,
        loadedNames?.data.length ?? 0,
      );

      if (endIndex - startIndex < maxIndexNumber) {
        startIndex = Math.max(0, endIndex - maxIndexNumber);
      }
    }

    setSelectedNameIndex(selectedIndex);

    let count = 0;
    for (let i = startIndex; i < endIndex; i++) {
      items.push(
        <li
          key={loadedNames?.data[i]?.id ?? `name-${i}`}
          className={`${styles.nameItem} ${selectedIndex === i ? styles.isSelected : ""} cursor-pointer ${styles[`nameIndex-${count}`]} ${displayDetailedView ? styles.detailedView : ""}`}
          onClick={() => {
            selectedIndex === i
              ? !displayDetailedView
                ? (setDisplayDetailedView(true),
                  setMaxIndexNumber(11),
                  setCenterIndexNumber(5))
                : (setDisplayDetailedView(false),
                  setMaxIndexNumber(7),
                  setCenterIndexNumber(3))
              : JumpToName(i, selectedIndex);
          }}
        >
          {loadedNames?.data[i]?.title}
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

  const renderDetailedView = () => {
    const nameData = loadedNames?.data[selectedNameIndex ?? 0];

    let categoryLabels = categoriesData?.filterGroups
      .filter((group) =>
        nameData?.categories.some((catId) => group.categoryIds.includes(catId)),
      )
      .map((group) => group.label)
      .join(" - ");

    let relatedNames = namesData?.data
      .filter((name) =>
        nameData?.categories.every((catId) => name.categories.includes(catId)),
      )
      .map((names) => names.title)
      .join(" - ");

    console.log(relatedNames);

    return (
      <>
        {categoryLabels && (
          <>
            <div className="flex flex-row gap-2">
              {nameData?.gender.includes("M") && (
                <i className={"pi pi-mars " + `${styles.genderIcon}`} />
              )}
              {nameData?.gender.includes("F") && (
                <i className={"pi pi-venus " + `${styles.genderIcon}`} />
              )}

              <h2 className={`${styles.categoryLabels}`}>{categoryLabels}</h2>
            </div>
          </>
        )}

        <div
          className={styles.definitionDiv}
          dangerouslySetInnerHTML={{ __html: nameData?.definition as string }}
        />

        <div className={styles.footer}>
          <span>Related Name</span>
          <h3 className={`${styles.relatedNames}`}>{relatedNames}</h3>

          <div className={`${styles.footerIcons} flex flex-row gap-1`}>
            <img
              src={iconLink.src}
              alt="link"
              className={`${isMobile && styles.mobile}`}
            />
            <img
              src={iconTwitter.src}
              alt="Twitter"
              className={`${isMobile && styles.mobile}`}
            />
            <img
              src={iconMessenger.src}
              alt="Messenger"
              className={`${isMobile && styles.mobile}`}
            />
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    let letterIndex =
      loadedNames?.data.findIndex((name) =>
        name.title.startsWith(selectedLetter ?? "a"),
      ) ?? null;
    letterIndex = letterIndex === 0 ? centerIndexNumber : letterIndex;
    setSelectedNameIndex(letterIndex);
    renderNames(letterIndex);
  }, [selectedLetter, loadedNames, namesData, maxIndexNumber]);

  useEffect(() => {
    setNameElements([]);

    let filteredNames = namesData?.data;

    if (selectedGender && selectedGender !== "Both") {
      filteredNames = filteredNames?.filter((name) =>
        name.gender.includes(selectedGender[0]),
      );
    }

    if (selectedCategoryIds.length > 0) {
      filteredNames = filteredNames?.filter((name) =>
        selectedCategoryIds.every((catId) => name.categories.includes(catId)),
      );
    }

    setLoadedNames({ data: filteredNames ?? [] });
    setSelectedNameIndex(null);
    renderNames(null);
  }, [selectedGender, namesData, selectedCategoryIds, maxIndexNumber]);

  if (loading || error) return null;
  return (
    <>
      {selectedLetter == null &&
      selectedGender == null &&
      selectedCategoryIds.length === 0 ? (
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
          <div className="flex flex-row items-center justify-center w-full">
            {!displayDetailedView && (
              <>
                <img
                  src={dog2.src}
                  alt="Dog"
                  className={`${isMobile && styles.mobile} ${styles.dogImage2}`}
                />
                <ul className="w-2/5">{nameElements}</ul>
              </>
            )}

            {loadedNames?.data && loadedNames?.data.length > 0 ? (
              <div
                className={`${styles.arrowDiv} flex flex-col w-100 w-1/5 items-center justify-around`}
              >
                <i
                  className={
                    "pi pi-angle-up text-2xl items-center primary cursor-pointer h-1/4 " +
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
                    selectedNameIndex < (loadedNames?.data.length ?? 0) - 1
                      ? renderNames(selectedNameIndex + 1)
                      : null;
                  }}
                />
              </div>
            ) : (
              <SplitText
                text={`Ooops we\n don't have any\n names that match\n your criteria!`}
                className={`text-2sm font-bold ${isMobile && styles.mobile} ${styles.noResults}`}
              />
            )}

            {displayDetailedView &&
            loadedNames?.data[selectedNameIndex ?? 0] ? (
              <>
                <ul className={`${styles.detailedViewUl} items-left text-left`}>
                  {nameElements}
                </ul>
                <div
                  className={`${styles.detailedViewDiv} flex flex-col items-left`}
                >
                  {renderDetailedView()}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
