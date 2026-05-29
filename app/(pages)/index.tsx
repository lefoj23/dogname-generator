export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-4xl font-bold m-2 text-center">Welcome to the Dog Name Generator!</h1>
      <p className="text-lg text-gray-600 m-2 text-center">
        Click the button below to enter in to the generator.
      </p>

      <a
        href="/DogNameGenerator"
        // target="_blank"
        rel="noopener noreferrer"
        className="p-button font-bold p-button-outlined p-button-primary"
      >
        Let's Go!
      </a>
    </div>
  );
}
