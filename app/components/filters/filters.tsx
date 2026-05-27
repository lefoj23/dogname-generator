"use client";
import styles from "./filters.module.scss";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCategoriesDriveData } from "../../hooks/useCategoriesDriveData";
import { Skeleton } from "primereact/skeleton";
import { ICategoriesData, IFilterGroups } from "../../models/categories";
import { useState, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
const Filters = () => {
  const isMobile = useIsMobile();
  const { data, loading, error, refresh } = useCategoriesDriveData();

  const [filterGroups, setFilterGroups] = useState<IFilterGroups[]>([]);
  const [categories, setCategories] = useState<ICategoriesData[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<IFilterGroups | null>(
    null,
  );
  const [selectedCategories, setSelectedCategories] = useState<
    ICategoriesData[]
  >([]);

  useEffect(() => {
    if (data?.filterGroups) setFilterGroups(data.filterGroups);
    if (data?.data) setCategories(data.data);
  }, [data]);

  const expandFilter = (filterGroup: IFilterGroups) => {
    setSelectedFilter(null);

    const updatedGroups = filterGroups.map((group) => {
      if (group === filterGroup) {
        return { ...group, isSelected: !group.isSelected };
      }
      return group;
    });
    setSelectedFilter(filterGroup.isSelected ? null : filterGroup);

    let selectedCategoryies = categories.filter((category) =>
      filterGroup.categoryIds.includes(category.id),
    );
    setSelectedCategories(selectedCategoryies);

    setFilterGroups(updatedGroups);
  };

  const renderFilterTabs = () => {
    return (
      <>
        {loading ? (
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        ) : (
          filterGroups.map((group) => (
            <div
              key={group.id}
              className={
                "flex items-center align-middle px-3 cursor-pointer hover:bg-gray-100"
              }
              onClick={() => expandFilter(group)}
            >
              <h4 className={"text-lg p-3"}>{group.label}</h4>
              <i
                className={
                  (group.isSelected ? "pi pi-angle-up" : "pi pi-angle-down") +
                  " text-2xl items-center primary"
                }
                style={{
                  color: "var(--primary-color)",
                  fontSize: "1.25rem",
                  fontWeight: "lighter",
                }}
              ></i>
            </div>
          ))
        )}
      </>
    );
  };

  const renderOptions = () => {
    return (
      <>
        {loading ? (
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        ) : (
          <div className="card flex flex-wrap justify-content-center gap-3">
            {selectedCategories.map((category) => {
              console.log(category);
              return (
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="ingredient1"
                    name="pizza"
                    value={category.id}
                    onChange={() => {}}
                    checked={false}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className={
          styles.filterWrapper +
          " flex flex-col items-stretch justify-center h-screen gap-4 max-w-full max-h-auto"
        }
      >
        <div className={styles.filterContainer + " flex items-center"}>
          <div
            className={styles.filterTitle + " flex items-center align-middle"}
          >
            <h4
              className={
                "text-lg p-3 align-middle" +
                (isMobile ? " min-w-3/4 w-3/4" : "")
              }
            >
              Filters:
            </h4>
          </div>
          {renderFilterTabs()}
        </div>
      </div>
      <div className={styles.optionsWrapper + " flex items-center"}>
        {renderOptions()}
      </div>

      {/* <div className="flex flex-col gap-3 p-4">
          {loading && <p>Loading filter categories...</p>}
          {error && (
            <div>
              <p className="text-red-600">Unable to load categories.</p>
              <pre>{error.message}</pre>
              <button className="p-button p-button-secondary" onClick={() => void refresh()}>
                Retry
              </button>
            </div>
          )}
          {!loading && !error && (
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
          )}
        </div> */}

      {/* {isMobile && (
          <>
            <i
              className="pi pi-filter text-2xl min-w-1/4 w-1/4 p-3 text-right items-center primary"
              style={{ color: "var(--primary-color)", fontSize: "1.25rem" }}
            ></i>
          </>
        )} */}

      {/* <div className="flex gap-4 items-center">test</div> */}
    </>
  );
};

export default Filters;
