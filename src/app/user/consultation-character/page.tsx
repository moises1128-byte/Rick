"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Collapsible } from "@/components/ui/collapsible";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";
import EpisodesStore from "@/store/episodes-store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const ConsultationCharacter = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { Array, editCharacter, deleteCharacter, setCharacterArray } =
    EpisodesStore();
  const [Status, setStaus] = useState<
    "Name" | "Gender" | "Type" | "Species" | "Status"
  >("Name");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(Array.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleStringToInt = (
    value: "Name" | "Gender" | "Type" | "Species" | "Status"
  ) => {
    setStaus(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredCharacters = Array.filter((character: any) => {
    return character[Status.toLowerCase()]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCharacters = filteredCharacters.slice(startIndex, endIndex);

  const fetchCharacters = async () => {
    setIsLoading(true);
    try {
      fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((characters) => setCharacterArray(characters.results));
      setIsLoading(false);
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <div className="flex gap-5 items-center	">
          <Avatar className="relative top-3">
            <AvatarImage src={"https://iili.io/2Kw10YB.png"} />
          </Avatar>

          <h3 className="mt-6 text-[#00B5CC] text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
            Characters List
          </h3>
        </div>

        {isLoading ? (
          <div className="container">
            <div className="flex flex-col gap-5">
              <Skeleton className="h-[5vh] w-2/4 rounded-xl" />

              <Skeleton className="h-[50vh] w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="flex gap-4">
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
                placeholder={
                  Status === "Name"
                    ? "Search by name"
                    : Status === "Status"
                    ? "Search by status"
                    : Status === "Species"
                    ? "Search by species"
                    : Status === "Type"
                    ? "Search by type"
                    : "Search by gender"
                }
                value={searchQuery}
                onChange={handleSearch}
              />

              <Select onValueChange={handleStringToInt}>
                <SelectTrigger className="w-[15%]">
                  <SelectValue placeholder="Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Name">Name</SelectItem>
                  <SelectItem value="Status">Status</SelectItem>
                  <SelectItem value="Species">Species</SelectItem>
                  <SelectItem value="Type">Type</SelectItem>
                  <SelectItem value="Gender">Gender</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Id</TableHead>
                    <TableHead className="font-medium">Image</TableHead>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Type</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Species</TableHead>
                    <TableHead className="font-medium">Gender</TableHead>
                    <TableHead className="font-medium">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.length !== 0 ? (
                    displayedCharacters.map((character, index) => (
                      <Collapsible key={index} asChild>
                        <TableRow>
                          <TableCell>{character.id}</TableCell>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={character.image} />
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-5 items-center	">
                              <Avatar>
                                <AvatarFallback>
                                  {character.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{character.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {character.type === "" ? "-" : character.type}
                          </TableCell>
                          <TableCell>{character.status}</TableCell>
                          <TableCell>{character.species}</TableCell>
                          <TableCell>
                            {character.gender === "" ? "-" : character.gender}
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-row gap-2.5 ">
                              <EditButton
                                title={"Character"}
                                back={"back"}
                                characterData={character}
                                editCharacter={editCharacter}
                              />

                              <DeleteButton
                                title={`Delete - ${character.name}`}
                                description={"Sure you want to delete this character ?"}
                                back={"back"}
                                next={"Delete Character"}
                                characterName={character.name}
                                id={character.id}
                                deleteCharacter={deleteCharacter}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      </Collapsible>
                    ))
                  ) : (
                    <div>theres is no data</div>
                  )}
                </TableBody>
              </Table>
            </div>
            {filteredCharacters.length >= 10 && (
              <div className="flex w-full flex-row-reverse gap-3 mt-5 mb-5">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                  onClick={handleNextPage}
                  disabled={currentPage >= Math.ceil(Array.length / pageSize)}
                >
                  Next
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ConsultationCharacter;
