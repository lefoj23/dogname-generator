"use client";
import styles from "./filters.module.scss";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCategoriesDriveData } from "../../hooks/useCategoriesDriveData";
import { useCategorySelection } from "../../hooks/useCategorySelection";
import { Skeleton } from "primereact/skeleton";
import { ICategoriesData, IFilterGroups } from "../../models/categories";
import { useState, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
import { motion, AnimatePresence } from "motion/react";

const Filters = () => {
  const isMobile = useIsMobile();
  const { data, loading, error, refresh } = useCategoriesDriveData();
  const {
    selectedCategoryIds,
    toggleCategory,
    isCategorySelected,
    clearCategories,
  } = useCategorySelection();

  const [filterGroups, setFilterGroups] = useState<IFilterGroups[]>([]);
  const [categories, setCategories] = useState<ICategoriesData[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<
    ICategoriesData[]
  >([]);

  const [selectedFilterGroup, setSelectedFilterGroup] =
    useState<IFilterGroups | null>(null);

  useEffect(() => {
    if (data?.filterGroups) setFilterGroups(data.filterGroups);
    if (data?.data) setCategories(data.data);
  }, [data]);

  const expandFilter = (filterGroup: IFilterGroups) => {
    setSelectedFilterGroup(null);

    const updatedGroups = filterGroups.map((group) => {
      if (group === filterGroup) {
        return { ...group, isSelected: !group.isSelected };
      } else {
        return { ...group, isSelected: false };
      }
    });
    let selectedCategoryies = categories.filter((category) =>
      filterGroup.categoryIds.includes(category.id),
    );
    setSelectedCategories(selectedCategoryies);

    let hasSelected = updatedGroups.some((item) => item.isSelected);

    setSelectedFilterGroup(hasSelected ? filterGroup : null);
    setFilterGroups(updatedGroups);
  };

  const renderFilterTabs = () => {
    return (
      <>
        {filterGroups.map((group) => (
          <div
            key={group.id}
            className={
              styles.filters +
              ` flex items-center align-middle px-3 cursor-pointer hover:bg-gray-100 ${isMobile && styles.mobile} ${group.isSelected && styles.isSelected}`
            }
            onClick={() => expandFilter(group)}
          >
            <h4 className={styles.fontRoboto + " text-lg p-3"}>
              {group.label}
            </h4>
            <motion.i
              className={
                (group.isSelected ? "pi pi-angle-up" : "pi pi-angle-down") +
                " text-2xl items-center primary"
              }
              style={{
                color: "var(--primary-color)",
                fontSize: "1.25rem",
                fontWeight: "lighter",
              }}
              animate={{ rotate: group.isSelected ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        ))}
      </>
    );
  };

  const renderOptions = () => {
    return (
      <>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          {selectedCategories.map((category) => {
            const isSelected = isCategorySelected(category.id);
            return (
              <div
                key={category.id}
                className="flex align-items-center min-w-40"
              >
                <Checkbox
                  inputId={`category-${category.id}`}
                  name={category.id}
                  value={category.id}
                  onChange={() => toggleCategory(category.id)}
                  checked={isSelected}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className={styles.fontRoboto + " ml-2 cursor-pointer"}
                >
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Skeleton height="4rem" className="mb-1"></Skeleton>
      ) : (
        <div
          className={
            styles.filterWrapper +
            (isMobile
              ? ` flex flex-col items-stretch justify-start max-w-full ${styles.mobile}`
              : " flex flex-col items-stretch justify-center h-screen gap-4 max-w-full max-h-auto")
          }
        >
          <div
            className={
              styles.filterContainer +
              " flex items-center min-w-full" +
              (isMobile ? " justify-start" : " justify-center")
            }
          >
            <div
              className={
                styles.filterTitle +
                (isMobile
                  ? " flex items-center justify-start align-middle min-w-1/4 w-1/4 border-r-0"
                  : " flex items-center align-middle")
              }
            >
              <h4 className={"text-lg p-3 align-middle"}>Filters:</h4>
            </div>
            {isMobile ? (
              <div
                className="w-3/4 text-right cursor-pointer"
                onClick={() => setIsFilterOpen((open) => !open)}
              >
                <motion.i
                  className="pi pi-filter m-4 "
                  animate={{ opacity: isFilterOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ pointerEvents: "none" }}
                ></motion.i>
                <motion.i
                  className="pi pi-filter-fill m-4"
                  animate={{ opacity: isFilterOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    right: 0,
                    pointerEvents: "none",
                  }}
                ></motion.i>
              </div>
            ) : (
              renderFilterTabs()
            )}
          </div>

          <AnimatePresence>
            {isMobile && isFilterOpen && (
              <motion.div
                className={
                  styles.filterContainer +
                  ` flex flex-row items-center justify-around flex-wrap ${styles.mobile}`
                }
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: { duration: 0.25, ease: "easeIn" },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    duration: 1,
                    ease: "easeOut",
                  },
                }}
              >
                {renderFilterTabs()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {(isMobile
        ? selectedCategories.length > 0 &&
          isFilterOpen &&
          selectedFilterGroup != null
        : selectedCategories.length > 0 && selectedFilterGroup != null) && (
        <div
          className={
            styles.optionsWrapper +
            (isMobile
              ? ` flex flex-col items-center ${styles.mobile} justify-around flex-wrap text-center`
              : ` flex flex-col items-center`)
          }
        >
          {renderOptions()}
        </div>
      )}
    </>
  );
};

export default Filters;
