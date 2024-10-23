"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type DataProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type CharacterProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type EditProps = {
  title: string;
  back: string;
  characterData: DataProps;
  editCharacter: (id: number, newItem: CharacterProps) => void;
};

const EditButton = ({
  title,
  back,
  characterData,
  editCharacter,
}: EditProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [Gender, setGender] = useState("");
  const [Status, setStatus] = useState("");

  const formSchema = z.object({
    image: z.string().min(1, "url is required"),
    name: z.string().min(1, "Name is required"),
    type: z.string(),
    status: z.string(),
    species: z.string().min(1, "Species is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: characterData.image ?? "",
      name: characterData.name ?? "",
      type: characterData.type ?? "",
      status: characterData.status ?? "",
      species: characterData.species ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      id: characterData.id,
      gender: Gender,
      status: Status,
      origin: { name: "", url: "" },
      location: { name: "", url: "" },
      episode: [""],
      url: "",
      created: "",
    };
    editCharacter(characterData.id, data);
    toast({
      description: `The Character ${characterData.name} has been updated ✅`,
    });
    setIsOpen(false);
  }

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <div
          onClick={() => setIsOpen(true)}
          className="hover:opacity-50 cursor-pointer"
        >
          <Pencil style={{ color: "#04ff00" }} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title} - {characterData.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
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
                          <SelectValue
                            placeholder={`${characterData.gender}`}
                          />
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

                  <Button type="submit">Update</Button>
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {back}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default EditButton;
