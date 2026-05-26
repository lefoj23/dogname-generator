import GenderSelection from "../../components/gender-selection/gender-selection";

export default function DogNameGenerator() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4">
      <GenderSelection />
    </div>
  );
}
