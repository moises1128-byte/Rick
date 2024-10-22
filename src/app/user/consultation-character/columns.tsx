"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Characters = {
  id: string;
  name: string;
  gender: string;
  Species: string;
  status: string;
  characterImage: string;
};

export const columns: ColumnDef<Characters>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "species",
    header: "Species",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "characterImage",
    header: "CharacterImage",
  },
];
