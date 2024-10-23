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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const CharacterCreation = () => {
  const { toast } = useToast();
  const { Array, addCharacter } = EpisodesStore();
  const [Gender, setGender] = useState("");
  const [Status, setStatus] = useState("");

  const formSchema = z.object({
    image: z.string().min(1, "url is required"),
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Type is required"),
    species: z.string().min(1, "Species is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      type: "",
      species: "",
    },
  });

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      description: "Character has been created succesfully ✅",
    });

    const data = {
      ...values,
      id: Array.length + 1,
      gender: Gender,
      status: Status,
      origin: { name: "", url: "" },
      location: { name: "", url: "" },
      episode: [""],
      url: "",
      created: "",
    };

    addCharacter(data);
  }

  return (
    <main className=" flex w-full bg-white	h-full justify-center items-center">
      <div className="w-3/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <div className="flex gap-5 items-center	">
          <Avatar className="relative top-3">
            <AvatarImage src={"https://iili.io/2KwPjb1.png"} />
          </Avatar>

          <h3 className="mt-6 text-[#00B5CC] text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
            Character Creation
          </h3>
        </div>

        <div className="mt-10 flex flex-col gap-y-10 w-full items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>type</FormLabel>
                    <FormControl>
                      <Input placeholder="type" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>status</FormLabel>
                <FormControl>
                  <Select onValueChange={handleStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alive">Alive</SelectItem>
                      <SelectItem value="Dead">Dead</SelectItem>
                      <SelectItem value="unknown">unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>

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

              <FormItem>
                <FormLabel>gender</FormLabel>
                <FormControl>
                  <Select onValueChange={handleGender}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="unknown">unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>

              <Button
                className="bg-[#00B5CC] hover:bg-[#00B5CC] hover:opacity-50"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default CharacterCreation;
