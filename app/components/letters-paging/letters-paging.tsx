"use client";
import styles from "./letters-paging.module.scss";
import { Skeleton } from "primereact/skeleton";
import { useLettersDriveData } from "../../hooks/useLettersDriveData";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { setSelectedLetter } from "../../store/lettersSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const LettersPaging = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const { data: letters, loading, error, refresh } = useLettersDriveData();

  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(
    null,
  );
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ErrorMessage = ({ onRetry }: { onRetry?: () => void }) => (
    <div className="flex flex-col items-center p-4">
      <p className="mb-2">Network error please try again or refresh the page</p>
      <Button label="Retry" icon="pi pi-refresh" onClick={onRetry} />
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-start justify-center m-2 gap-6 w-3/4">
        <Skeleton
          width={isMobile ? "100%" : "15vw"}
          height="4rem"
          className="mb-1"
        ></Skeleton>
        <Skeleton width="100%" height="3rem"></Skeleton>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={refresh} />;
  }

  return (
    <div
      className={
        "flex flex-col items-start justify-center m-2" +
        (isMobile ? ` w-full mb-4 ${styles.mobile}` : " max-w-75vw")
      }
    >
      <h3
        className={
          isMobile
            ? "flex text-lg w-full item-center justify-center size-4rem p-2 text-center"
            : "block text-lg size-15vw size-4rem p-4"
        }
      >
        All pets names
      </h3>
      <div className="w-full flex flex-wrap justify-center gap-2">
        {(() => {
          const letterData = letters?.data || [];

          if (width !== null && width <= 1280) {
            // mobile/tablet: two cards A-M and N-Z
            const first = letterData.slice(0, 13);
            const second = letterData.slice(13);
            return [first, second].map((group, gIdx) => (
              <Card
                key={gIdx}
                className={styles.lettersWrapper + " " + styles.mobile}
              >
                <div
                  className={styles.mobile + " flex flex-wrap justify-center"}
                >
                  {group.map((letter, i) => {
                    const index = (gIdx === 0 ? 0 : 13) + i;
                    return (
                      <Button
                        key={index}
                        label={letter}
                        rounded
                        text
                        className={
                          index === selectedLetterIndex
                            ? styles.selectedLetter
                            : ""
                        }
                        onClick={() => {
                          setSelectedLetterIndex(index);
                          dispatch(setSelectedLetter(letter));
                        }}
                      />
                    );
                  })}
                </div>
              </Card>
            ));
          }

          return (
            <Card
              className={
                styles.lettersWrapper + " flex items-center justify-center p-3"
              }
            >
              {letterData.map((letter, index) => (
                <Button
                  key={index}
                  label={letter}
                  rounded
                  text
                  className={
                    index === selectedLetterIndex ? styles.selectedLetter : ""
                  }
                  onClick={() => {
                    setSelectedLetterIndex(index);
                    dispatch(setSelectedLetter(letter));
                  }}
                />
              ))}
            </Card>
          );
        })()}
      </div>
    </div>
  );
};

export default LettersPaging;
