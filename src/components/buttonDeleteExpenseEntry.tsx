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

type Props = {
  className?: string;
  entry: ExpenseEntry;
};

export function ButtonDeleteExpenseEntry(props: Props) {
  const deleteEntry = async () => {
    const newList = await db.expenseList.where("id").equals(props.entry.entryOf).first()
    if(!newList) {
      throw new Error(`[delete entry] invalid entry list: list of id ${props.entry.entryOf} not found`);
    }

    newList.total -= props.entry.amount
    newList.total = Math.round(newList.total * 100) / 100
    db.expenseList.update(props.entry.entryOf, newList)
    db.expenseEntries.delete(props.entry.id!)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={props.className}>
          🛇
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm to delete entry <br />
            {props.entry.title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteEntry} className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90">Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
