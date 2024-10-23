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
import { useState } from "react";

type DataProps = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type EpisodeProps = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type EditProps = {
  title: string;
  back: string;
  episodeData: DataProps;
  editEpisode: (id: number, newItem: EpisodeProps) => void;
};

const EditButton = ({ title, back, episodeData, editEpisode }: EditProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    created: z.string().min(1, "created is required"),
    air_date: z.string().min(1, "AirDate is required"),
    url: z.string().min(1, "url is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: episodeData.name ?? "",
      created: episodeData.created ?? "",
      air_date: episodeData.air_date ?? "",
      url: episodeData.url ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      id: episodeData.id,
      episode: "",
      characters: [""],
      url: "",
      created: "",
    };
    editEpisode(episodeData.id, data);
    toast({
      description: `The episode ${episodeData.name} has been updated ✅`,
    });
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <div
          onClick={() => setIsOpen(true)}
          className="hover:opacity-50 cursor-pointer"
        >
          <Pencil style={{ color: "#b5e031" }} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title} - {episodeData.name}
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
                    name="created"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>created</FormLabel>
                        <FormControl>
                          <Input placeholder="created" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="air_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AriDate</FormLabel>
                        <FormControl>
                          <Input placeholder="air_date" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                          <Input placeholder="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="bg-[#00B5CC] hover:bg-[#00B5CC] hover:opacity-50"
                    type="submit"
                  >
                    Submit
                  </Button>
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
