"use client";
import { Button } from "primereact/button";
import styles from "./gender-selection.module.scss";
import { environment } from "../../config/environment";
import { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";

export default function GenderSelection() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (environment.featureflag.simulateSlowNetwork) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton width="15vw" height="4rem" className="mb-1 mt-2"></Skeleton>
          <Skeleton width="15vw" height="4rem" className="mb-4"></Skeleton>
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
              className={`p-button-primary p-button-outlined`}
            />
            <Button
              label="Female"
              className={`p-button-primary p-button-outlined`}
            />
            <Button
              label="Both"
              className={`p-button-primary p-button-outlined`}
            />
          </div>
        </div>
      )}
    </>
  );
}
