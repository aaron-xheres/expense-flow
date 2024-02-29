"use client";

import { useAtom, type WritableAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "./ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "@/components/ui/input";
import { createRef, RefObject } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(32),
  amount: z.preprocess(x => parseFloat(z.string().parse(x)), z.number().refine(x => x * 100 - Math.trunc(x * 100) < Number.EPSILON)),
  badge: z
    .string()
    .refine(
      (r) =>
        r === "food" || r === "transport" || r === "entertainment" || r === "bills" || r === "others" || r === "none"
    ),
  description: z.string().optional()
});

type Props = {
  className?: string;
  currency: string;
  atomExpenseData: WritableAtom<ExpenseData[], [ExpenseData[], (draft: ExpenseData[]) => void], void>;
};

export function ButtonNewExpenseEntry(props: Props) {
  const [expenseData, setExpenseData] = useAtom(props.atomExpenseData);

  const btnDrawerClose: RefObject<HTMLButtonElement> = createRef();

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      badge: "none",
      description: "",
    },
  });

  // Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    btnDrawerClose.current?.click();
    form.reset();
    console.log("[form submit]", values);
  }

  return (
    <Drawer onOpenChange={() => form.reset()}>
      <DrawerTrigger asChild>
        <Button className={props.className}>New Entry</Button>
      </DrawerTrigger>
      <DrawerContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ({props.currency})</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" defaultValue="" step="0.01" onChange={field.onChange} onBlur={field.onBlur} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="No Badge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-secondary" value="none">
                        No Badge
                      </SelectItem>
                      <SelectItem value="food">🍔 Food</SelectItem>
                      <SelectItem value="transport">🚈 Transport</SelectItem>
                      <SelectItem value="entertainment">🎮 Entertainment</SelectItem>
                      <SelectItem value="bills">📝 Bills</SelectItem>
                      <SelectItem value="others">❓ Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit" className="w-full">
              Add
            </Button>
            <DrawerClose asChild className="hidden">
              <Button ref={btnDrawerClose} />
            </DrawerClose>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
