import { Button } from "primereact/button";
import styles from "./gender-selection.module.scss";
export default function GenderSelection() {
  return (
    <>
      <div className={styles.wrapper + " flex flex-col items-center justify-center h-screen gap-4"}>
        <h3 className="text-2xl">Choose your pet's gender</h3>
        <div className="flex gap-4">
          <Button label="Male" className={`p-button-primary p-button-outlined`} />
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
    </>
  );
}
