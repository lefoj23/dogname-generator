import GenderSelection from "../../components/gender-selection/gender-selection";
import Filters from "../../components/filters/filters";
export default function DogNameGenerator() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4">
      <GenderSelection />
      <Filters />
    </div>
  );
}
