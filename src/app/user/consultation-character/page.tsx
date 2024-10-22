"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import CharactersStore from "@/store/character-store";

const ConsultationCharacter = () => {
  const { array } = CharactersStore();

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Cunsultation Character
        </h3>

        {array.length !== 0 && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={array} />
          </div>
        )}
      </div>
    </main>
  );
};

export default ConsultationCharacter;
