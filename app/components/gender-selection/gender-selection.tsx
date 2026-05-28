"use client";
import { Button } from "primereact/button";
import styles from "./gender-selection.module.scss";
import { environment } from "../../config/environment";
import { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useGenderSelection } from "../../hooks/useGenderSelection";

export default function GenderSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const { selectedGender, setGender } = useGenderSelection();

  useEffect(() => {
    if (environment.featureflag.simulateSlowNetwork) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, []);

  const getButtonClass = (gender: "Male" | "Female" | "Both") =>
    selectedGender === gender
      ? `p-button-primary`
      : "p-button-primary p-button-outlined";

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton
            width={isMobile ? "75vw" : "15vw"}
            height="4rem"
            className="mb-1 mt-2"
          ></Skeleton>
          <Skeleton
            width={isMobile ? "75vw" : "15vw"}
            height="4rem"
            className="mb-4"
          ></Skeleton>
        </>
      ) : (
        <div
          className={
            styles.wrapper +
            " flex flex-col items-center p-5 justify-center h-screen gap-4"
          }
        >
          <h3 className="text-2xl">Choose your pet's gender</h3>
          <div className="flex gap-4">
            <Button
              label="Male"
              className={getButtonClass("Male")}
              onClick={() => setGender("Male")}
            />
            <Button
              label="Female"
              className={getButtonClass("Female")}
              onClick={() => setGender("Female")}
            />
            <Button
              label="Both"
              className={getButtonClass("Both")}
              onClick={() => setGender("Both")}
            />
          </div>
        </div>
      )}
    </>
  );
}
