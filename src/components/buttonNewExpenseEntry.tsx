"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "./ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "@/components/ui/input";
import { createRef, RefObject } from "react";
import { db, db_addExpeseEntry } from "@/lib/db";

const formSchema = z.object({
  name: z.string().min(2).max(24),
  amount: z.preprocess(
    (x) => parseFloat(z.string().parse(x)),
    z.number().min(0.01).max(99999)
  ),
  tag: z
    .string()
    .refine((r) => r === "🍔" || r === "🚈" || r === "🎮" || r === "📝" || r === "-"),
  description: z.string().optional()
});

type Props = {
  className?: string;
  expense?: Expense;
  expenseEntries?: ExpenseEntry[];
};

export function ButtonNewExpenseEntry(props: Props) {
  const btnDrawerClose: RefObject<HTMLButtonElement> = createRef();

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "-",
    },
  });

  // Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = Date.now();
    const newEntry = {
      title: values.name,
      amount: values.amount,
      tag: values.tag,
      description: values.description,
      entryOf: props.expense!.id,
    };

    db_addExpeseEntry(props.expense!.id, newEntry);

    btnDrawerClose.current?.click();
    form.reset();
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
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Amount ({props.expense?.currency})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      defaultValue=""
                      step="0.01"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="No Tag" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-secondary" value="none">
                        No Tag
                      </SelectItem>
                      <SelectItem value="🍔">🍔 Food</SelectItem>
                      <SelectItem value="🚈">🚈 Transport</SelectItem>
                      <SelectItem value="🎮">🎮 Entertainment</SelectItem>
                      <SelectItem value="📝">📝 Bills</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
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
