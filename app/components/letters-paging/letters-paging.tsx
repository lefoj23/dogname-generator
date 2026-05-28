"use client";
import styles from "./letters-paging.module.scss";
import { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";
import { fetchLettersDriveData } from "../../services/api-service";
import { ILettersResponse } from "@/app/models/letters";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
interface LettersData {
  data?: any[];
  [key: string]: any;
}

const LettersPaging = () => {
  const [letters, setLetters] = useState<ILettersResponse | null>(null);

  useEffect(() => {
    if (letters == null) {
      const fetchAndSetLetters = async () => {
        const resp = await fetchLetters();
        setLetters(resp);
      };
      fetchAndSetLetters();
    }
  }, [letters]);

  const fetchLetters = async (): Promise<ILettersResponse> => {
    return await fetchLettersDriveData();
  };

  return (
    <>
      {letters == null ? (
        <>
          <div className="flex flex-col items-start justify-center m-2 gap-6 w-3/4">
            <Skeleton width="15vw" height="4rem" className="mb-1"></Skeleton>

            <Skeleton width="100%" height="3rem"></Skeleton>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start justify-center m-2 max-w-75vw">
            <h3 className="block text-lg size-15vw size-4rem p-4">All pets names</h3>
            <Card
              className={
                styles.lettersWrapper + " flex items-center justify-center"
              }
            >
              {letters?.data.map((letter, index) => (
                <Button label={letter} rounded text />
              ))}
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default LettersPaging;
