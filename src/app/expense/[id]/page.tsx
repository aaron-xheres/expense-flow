"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

import * as CONST from "@/consts";
import { ls_getExpenseById, ls_getExpenseDataById } from "@/lib/localStorage";
import { columns } from "./column";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ButtonNewExpenseEntry } from "@/components/buttonNewExpenseEntry";

const state_expenseData = atomWithImmer<ExpenseData[]>([]);
const state_expense = atomWithImmer<Expense>(CONST.DEFAULT_EXPENSE);

export default function ExpensePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const [expenseData, setExpenseData] = useAtom(state_expenseData);
  const [expense, setExpense] = useAtom(state_expense);

  useEffect(() => {
    const lsExpenseData = ls_getExpenseDataById(id);
    const lsExpense = ls_getExpenseById(id);

    if (!lsExpense || !lsExpenseData) {
      console.error(id, lsExpense, lsExpenseData);
      throw new Error("[expense] invalid expense or expense data");
    }

    setExpense(lsExpense);
    setExpenseData(lsExpenseData);
  }, []);

  return (
    <div className="flex min-w-full flex-col items-center justify-start p-8">
      <Card className="min-w-full">
        <CardHeader className="flex-row items-center justify-start space-y-0">
          <CardTitle className="w-full flex-grow">{expense.name}</CardTitle>
          <br />
          <CardDescription>
            {expense.currency}
            {expense.total}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="min-w-full py-10">
        <DataTable columns={columns} data={expenseData} />
      </div>
      <div className="min-w-full">
        <ButtonNewExpenseEntry className="w-full" currency={expense.currency} atomExpenseData={state_expenseData} />
      </div>
    </div>
  );
}
