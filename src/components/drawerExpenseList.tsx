"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/lib/db";

import { ScrollArea } from "./ui/scroll-area";
import { DrawerClose } from "./ui/drawer";
import { Button } from "./ui/button";

export function DrawerExpenseList() {
  const expenseCategory = useLiveQuery(() =>
    db.expenseCategory.toArray().then((arr) => {
      if (!arr?.find((category) => category.id === -1)) {
        db.expenseCategory.put({
          id: -1,
          name: "Uncategorized",
          list: [],
        });
      }

      return arr;
    })
  );

  const expenseList = useLiveQuery(() => db.expenseList.toArray());

  return (
    <ScrollArea className="flex h-full flex-grow p-4">
      {expenseCategory?.toReversed().map((category) => (
        <div key={category.id} className="mb-4">
          <h1 className={category.id === -1 ? "text-secondary" : ""}>{category.name}</h1>
          {category.list.map((id) => {
            const expense = expenseList?.find((list) => list.id === id);
            return (
              <Link key={id} href={`/expense/${id}`}>
                <DrawerClose asChild>
                  <Button variant="outline" className="my-2 min-w-full justify-start">
                    <div className="flex w-full">{expense?.name}</div>
                    <div className="ml-auto flex">
                      {expense?.currency} {expense?.total}
                    </div>
                  </Button>
                </DrawerClose>
              </Link>
            );
          })}
        </div>
      ))}
    </ScrollArea>
  );
}
