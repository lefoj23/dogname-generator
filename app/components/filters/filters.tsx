import styles from "./filters.module.scss";

export default function Filters() {
  return (
    <>
      <div className={styles.wrapper + " flex flex-col items-stretch justify-center h-screen gap-4"}>
          <h4 className="text-lg">Filters:</h4>
       
        {/* <div className="flex gap-4 items-center">
        </div> */}
      </div>
    </>
  );
}
