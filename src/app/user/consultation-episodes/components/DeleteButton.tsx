import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

import { Trash2 } from "lucide-react";

type DeleteProps = {
  title: string;
  description: string;
  back: string;
  next: string;
  id: number;
  deleteEpisode: (id: number) => void;
  episodeName: string;
};

const DeleteButton = ({
  title,
  description,
  back,
  next,
  id,
  episodeName,
  deleteEpisode,
}: DeleteProps) => {
  const { toast } = useToast();
  const handleDelete = (id: number) => {
    deleteEpisode(id);
    toast({
      description: `The Episode "${episodeName}" has been deleted succesfully ✅`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:opacity-50 cursor-pointer">
          <Trash2 style={{ color: "red" }} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{back}</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            {next}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
