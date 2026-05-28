"use client";
import styles from "./letters-paging.module.scss";
import { Skeleton } from "primereact/skeleton";
import { useLettersDriveData } from "../../hooks/useLettersDriveData";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

const LettersPaging = () => {
  const { data: letters, loading, error, refresh } = useLettersDriveData();

  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(
    null,
  );

  const ErrorMessage = ({ onRetry }: { onRetry?: () => void }) => (
    <div className="flex flex-col items-center p-4">
      <p className="mb-2">
        Network error please try again or refresh the page
      </p>
      <Button label="Retry" icon="pi pi-refresh" onClick={onRetry} />
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-start justify-center m-2 gap-6 w-3/4">
        <Skeleton width="15vw" height="4rem" className="mb-1"></Skeleton>
        <Skeleton width="100%" height="3rem"></Skeleton>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={refresh} />;
  }

  return (
    <div className="flex flex-col items-start justify-center m-2 max-w-75vw">
      <h3 className="block text-lg size-15vw size-4rem p-4">All pets names</h3>
      <Card
        className={styles.lettersWrapper + " flex items-center justify-center"}
      >
        {letters?.data.map((letter, index) => (
          <Button
            key={index}
            label={letter}
            rounded
            text
            className={
              index === selectedLetterIndex ? styles.selectedLetter : ""
            }
            onClick={() => setSelectedLetterIndex(index)}
          />
        ))}
      </Card>
    </div>
  );
};

export default LettersPaging;
