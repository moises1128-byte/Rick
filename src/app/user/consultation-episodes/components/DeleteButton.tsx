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

import { Trash2 } from "lucide-react";

type DeleteProps = {
  title: string;
  description: string;
  back: string;
  next: string;
};

const DeleteButton = ({ title, description, back, next }: DeleteProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:opacity-50 cursor-pointer">
          <Trash2
            style={{ color: "red" }}
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{back}</AlertDialogCancel>
          <AlertDialogAction>{next}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
