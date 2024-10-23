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
import { useRef, useState } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    status: z.string().min(1, "created is required"),
    species: z.string().min(1, "AirDate is required"),
    image: z.string().min(1, "url is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: characterData.name ?? "",
      status: characterData.status ?? "",
      species: characterData.species ?? "",
      image: characterData.image ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editCharacter(characterData.id, values);
    toast({
      description: `The Character ${characterData.name} has been updated ✅`,
    });
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onClose={() => setIsOpen(false)} ref={dialogRef}>
      <AlertDialogTrigger asChild>
        <div
          onClick={() => setIsOpen(true)}
          className="hover:opacity-50 cursor-pointer"
        >
          <Pencil style={{ color: "#04ff00" }} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>status</FormLabel>
                        <FormControl>
                          <Input placeholder="status" {...field} />
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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{back}</AlertDialogCancel>
          {/* <AlertDialogAction>{next}</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default EditButton;
