"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ConsultationCharacter = () => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const characters = await response.json();
      setCharacters(characters);
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Cunsultation Character
        </h3>

        {characters.length !== 0 && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={characters.results} />
          </div>
        )}
      </div>
    </main>
  );
};

export default ConsultationCharacter;
