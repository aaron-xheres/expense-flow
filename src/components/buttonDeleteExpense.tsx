"use client";

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
import { Button } from "./ui/button";
import { db } from "@/lib/db";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  expense?: Expense;
};

export function ButtonDeleteExpense(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const deleteExpense = async () => {
    if (!props.expense) {
      throw new Error(`[delete expense] invalid expense`);
    }

    const newCategory = await db.expenseCategory.where("list").equals(props.expense.id).first();
    if (!newCategory) {
      throw new Error(`[delete entry] invalid entry list: expense of id ${props.expense.id} not found`);
    }

    newCategory.list = newCategory.list.filter((id) => id !== props.expense!.id);
    db.expenseCategory.update(newCategory.id, newCategory);
    db.expenseList.delete(props.expense.id);

    if (pathname.includes(props.expense.id.toString())) {
      router.push("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={props.className}>
          🛇
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm to delete expense <br />
            {props.expense?.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteExpense}
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
