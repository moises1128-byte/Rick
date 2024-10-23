"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import EpisodesStore from "@/store/episodes-store";
import { useState } from "react";

const CharacterCreation = () => {
  const { toast } = useToast();
  const { Array, addCharacter } = EpisodesStore();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    // status: z.string().min(1, "created is required"),
    species: z.string().min(1, "AirDate is required"),
    image: z.string().min(1, "url is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // status: "",
      species: "",
      image: "",
    },
  });

  const [Status, setStaus] = useState("");

  const handleStringToInt = (value: string) => {
    setStaus(value);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      description: "Character has been created succesfully ✅",
    });

    const data = { ...values, id: Array.length + 1, status: Status };

    addCharacter(data);
  }

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Character Creation
        </h3>

        <div className="mt-10 flex flex-col gap-y-10 w-full items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={() => (
                  <FormItem>
                    <FormLabel>status</FormLabel>
                    <FormControl>
                      <Select onValueChange={handleStringToInt}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Alive">Alive</SelectItem>
                          <SelectItem value="unknown">unknown</SelectItem>
                          <SelectItem value="Dead">Dead</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>species</FormLabel>
                    <FormControl>
                      <Input placeholder="species" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>image</FormLabel>
                    <FormControl>
                      <Input placeholder="image" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default CharacterCreation;
