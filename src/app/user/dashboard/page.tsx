"use client";

import CharactersStore from "@/store/character-store";
import EpisodesStore from "@/store/episodes-store";
import { useCounterStore } from "@/store/providers/counter-store-provider";
import { useEffect } from "react";

const Dashboard = () => {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state
  );

  const { array, setCharacterArray } = CharactersStore();

  const { setEpisodesData } = EpisodesStore();

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const characters = await response.json();
      setCharacterArray(characters.results);
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      fetch("https://rickandmortyapi.com/api/episode")
        .then((response) => response.json())
        .then((episodes) => setEpisodesData(episodes.results));
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchEpisodes();
  }, []);

  console.log(array, "test");

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Dashboard
        </h3>

        <div>
          Count: {count}
          <hr />
          <button type="button" onClick={() => void incrementCount()}>
            Increment Count
          </button>
          <button type="button" onClick={() => void decrementCount()}>
            Decrement Count
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
