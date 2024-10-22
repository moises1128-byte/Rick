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

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";

const ConsultationEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEpisodes = async () => {
    try {
      fetch("https://rickandmortyapi.com/api/episode")
        .then((response) => response.json())
        .then((episodes) => setEpisodes(episodes.results));
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(episodes.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredEpisodes = episodes.filter((episode: { name: string }) =>
    episode.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedEpisodes = filteredEpisodes.slice(startIndex, endIndex);

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Cunsultation Character
        </h3>

        <div className="container mx-auto">
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="rounded-md border mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Created</TableHead>
                  <TableHead className="font-medium">Views</TableHead>
                  <TableHead className="font-medium">Image</TableHead>
                  <TableHead className="font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {episodes ? (
                  displayedEpisodes.map((episode: any, index) => (
                    <Collapsible key={index} asChild>
                      <TableRow>
                        <TableCell>{episode.name}</TableCell>
                        <TableCell>{episode.created}</TableCell>
                        <TableCell>
                          {episode.episode}
                          <CollapsibleTrigger asChild>
                            <div>{episode.air_date}</div>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell>
                          <Image
                            alt="test"
                            width={40}
                            height={40}
                            src={
                              "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-2.5 ">
                            <EditButton
                              title={"Edit titlekjasd"}
                              description={"descrpition asjhd"}
                              back={"back"}
                              next={"nextkAJS"}
                            />

                            <DeleteButton
                              title={"Delete titlekjasd"}
                              description={"descrpition asjhd"}
                              back={"back"}
                              next={"nextkAJS"}
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
          {filteredEpisodes.length >= 10 && (
            <div className="flex w-full flex-row-reverse gap-3 mt-5 mb-5">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                onClick={handleNextPage}
                disabled={currentPage >= Math.ceil(episodes.length / pageSize)}
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
      </div>
    </main>
  );
};

export default ConsultationEpisodes;
