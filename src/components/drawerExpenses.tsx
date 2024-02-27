import { useAtom } from "jotai";
import { state_expenseList, state_expenseCategory } from "@/states";

import { DrawerFooter, DrawerClose } from "./ui/drawer";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./modeToggle";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import Link from "next/link";

export function DrawerExpenses() {
  const [expenseList] = useAtom(state_expenseList);
  const [expenseCategory] = useAtom(state_expenseCategory);

  console.log("expense list", expenseList);
  console.log("expense category", expenseCategory);

  return (
    <>
      <div className="z-0 mt-2 flex h-9 items-start justify-end">
        <DrawerClose asChild>
          <Button variant="ghost" className="focus:bg-inherit">
            ✖
          </Button>
        </DrawerClose>
      </div>
      <ScrollArea className="flex h-full flex-grow p-4">
        {expenseCategory.map((category) => (
          <div key={category.id}>
            <h1>{category.name}</h1>
            {category.list.map((id) => {
              const expense = expenseList.find((list) => list.id === id);
              return (
                <Link key={id} href={`/expense/${id}`}>
                  <DrawerClose asChild>
                    <Button variant="outline" className="my-1 min-w-full justify-start">
                      <div className="flex w-full">{expense?.name}</div>
                      <div className="ml-auto flex">{expense?.currency}</div>
                    </Button>
                  </DrawerClose>
                </Link>
              );
            })}
          </div>
        ))}
      </ScrollArea>
      <div className="flex h-24 flex-col">
        <div className="flex items-center justify-center">
          <Separator className="my-2 w-[90%]" />
        </div>
        <div>
          <DrawerFooter>
            <ModeToggle className="self-end" />
          </DrawerFooter>
        </div>
      </div>
    </>
  );
}
