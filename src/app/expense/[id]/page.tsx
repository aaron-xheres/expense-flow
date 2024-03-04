"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/lib/db";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonNewExpenseEntry } from "@/components/buttonNewExpenseEntry";
import ExpenseTable from "./expenseTable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ExpensePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const expense = useLiveQuery(() => db.expenseList.get(id));
  const expenseEntries = useLiveQuery(() => db.expenseEntries.where("entryOf").equals(id).toArray());

  return (
    <div className="flex min-w-full flex-col items-center justify-start p-8">
      <Card className="min-w-full">
        <CardHeader className="flex-row items-center justify-start space-y-0">
          <CardTitle className="w-full flex-grow">{expense?.name}</CardTitle>
          <br />
          <CardDescription>
            {expense?.currency}
            {expense?.total.toFixed(2)}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="min-w-full py-10">
        <ScrollArea>
          <ExpenseTable currency={expense?.currency} expenseEntries={expenseEntries} />
        </ScrollArea>
      </div>
      <div className="mt-auto min-w-full">
        <ButtonNewExpenseEntry
          className={(expense ? "" : "disabled") + " w-full"}
          expense={expense}
          expenseEntries={expenseEntries}
        />
      </div>
    </div>
  );
}
