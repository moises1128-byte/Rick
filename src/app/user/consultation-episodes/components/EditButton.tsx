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

type DataProps = {
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
  editEpisode: (id: number, newItem: Partial<DataProps>) => void;
};

const EditButton = ({ title, back, episodeData, editEpisode }: EditProps) => {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    created: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    air_date: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    url: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: episodeData.name ?? "asdasd",
      created: episodeData.created ?? "",
      air_date: episodeData.air_date ?? "",
      url: episodeData.url ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editEpisode(episodeData.id, values);
    toast({
      description: `The episode ${episodeData.name} has been updated.`,
    });
    // console.log(values, "test");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:opacity-50 cursor-pointer">
          <Pencil style={{ color: "#04ff00" }} />
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
