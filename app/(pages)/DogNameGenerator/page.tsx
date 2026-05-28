import GenderSelection from "../../components/gender-selection/gender-selection";
import Filters from "../../components/filters/filters";
import LettersPaging from "../../components/letters-paging/letters-paging";
import Body from "./body";
import styles from "./page.module.scss";

export default async function DogNameGenerator() {
  return (
    <div
      className={"flex flex-col items-center justify-start h-screen w-screen"}
    >
      <GenderSelection />
      <Filters />
      <LettersPaging />
      <Body />
    </div>
  );
}
