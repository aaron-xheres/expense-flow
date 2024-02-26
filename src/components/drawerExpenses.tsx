import { DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "./ui/drawer";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./modeToggle";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export function DrawerExpenses() {
  return (
    <>
      <div className="z-0 mt-2 flex h-9 items-start justify-end">
        <DrawerClose asChild>
          <Button variant="ghost" className="focus:bg-inherit">✖</Button>
        </DrawerClose>
      </div>
      <ScrollArea className="flex h-full flex-grow p-4">
        <div>
          <p>test</p>
        </div>
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
