"use client";

import EpisodesStore from "@/store/episodes-store";

const CharacterCreation = () => {
  const { Array, addCharacter } = EpisodesStore();

  console.log(Array, "test");

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Character Creation
        </h3>
      </div>
    </main>
  );
};

export default CharacterCreation;
