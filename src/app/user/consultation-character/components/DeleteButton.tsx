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
  deleteCharacter: (id: number) => void;
  characterName: string;
};

const DeleteButton = ({
  title,
  description,
  back,
  next,
  id,
  characterName,
  deleteCharacter,
}: DeleteProps) => {
  const { toast } = useToast();
  const handleDelete = (id: number) => {
    deleteCharacter(id);
    toast({
      description: `The Character "${characterName}" has been deleted succesfully ✅`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:opacity-50 cursor-pointer">
          <Trash2 style={{ color: "#00B5CC" }} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{back}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#00B5CC] hover:bg-[#00B5CC] hover:opacity-50"
            onClick={() => handleDelete(id)}
          >
            {next}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
