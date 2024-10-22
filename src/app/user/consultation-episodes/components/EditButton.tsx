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

import { Pencil } from "lucide-react";

type EditProps = {
  title: string;
  description: string;
  back: string;
  next: string;
};

const EditButton = ({ title, description, back, next }: EditProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:opacity-50 cursor-pointer">
          <Pencil style={{ color: "#04ff00" }} />
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
export default EditButton;
