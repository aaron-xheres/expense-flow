"use client";

import { DrawerFooter, DrawerClose } from "./ui/drawer";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./modeToggle";
import { Button } from "./ui/button";

import { ButtonNewExpenseFolderCategory } from "./buttonNewExpenseFolderCategory";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { DrawerExpenseList } from "./drawerExpenseList";

export function DrawerExpenses() {
  return (
    <>
      <div className="z-0 mt-2 flex h-9 items-start justify-end">
        <DrawerClose asChild>
          <Button variant="ghost" className="focus:bg-inherit">
            ✖
          </Button>
        </DrawerClose>
      </div>
      <Suspense fallback={<Skeleton className="min-h-full" />}>
        <DrawerExpenseList />
      </Suspense>
      <div className="flex h-24 flex-col">
        <div className="flex items-center justify-center">
          <Separator className="my-2 w-[90%]" />
        </div>
        <div>
          <DrawerFooter className="flex-row">
            <ButtonNewExpenseFolderCategory className="w-full" />
            <ModeToggle />
          </DrawerFooter>
        </div>
      </div>
    </>
  );
}
