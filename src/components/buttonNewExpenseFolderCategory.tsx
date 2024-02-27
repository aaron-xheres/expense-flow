import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { state_expenseCategory, state_expenseList } from "@/states";
import { ls_addExpenseCategory, ls_addExpenseList } from "@/lib/localStorage";
import { DrawerClose } from "./ui/drawer";

const formSchema = z.object({
  type: z.string().refine((v) => v === "category" || v === "expense"),
  name: z.string().min(2).max(32),
  currency: z.string().min(1).max(8),
  categoryId: z.string(),
});

type Props = {
  className?: string;
};

export function ButtonNewExpenseFolderCategory(props: Props) {
  const [expenseCategory, setExpenseCategory] = useAtom(state_expenseCategory);
  const [, setExpenseList] = useAtom(state_expenseList);

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "expense",
      name: new Date().toLocaleDateString(),
      categoryId: "-1",
      currency: "$",
    },
  });

  // Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset()

    if (values.type === "category") {
      const newCategory: ExpenseCategory = {
        id: Date.now(),
        name: values.name,
        list: [],
      };

      setExpenseCategory((draft) => {
        draft.push(newCategory);
      });
      ls_addExpenseCategory(newCategory);
    }

    if (values.type === "expense") {
      console.log(values.categoryId);
      const categoryId = parseInt(values.categoryId);
      if (Number.isNaN(categoryId)) {
        throw new Error("[new expense form] invalid category id: value is not a number");
      }

      const newExpense: Expense = {
        id: Date.now(),
        name: values.name,
        currency: values.currency,
        total: 0,
      };

      setExpenseList((draft) => {
        draft.push(newExpense);
      });
      setExpenseCategory((draft) => {
        const category = draft.find((c) => c.id === categoryId);
        if (!category) {
          throw new Error("[new expense form] invalid category id: category not found");
        }

        category.list.push(newExpense.id);
      });

      ls_addExpenseList(categoryId, newExpense);
    }

    console.log("[form submit]", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={props.className}>New</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Expense" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{form.getValues("type") === "expense" ? "Expense Name" : "Category Name"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={form.getValues("type") === "expense" ? new Date().toLocaleDateString() : "Category"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("type") === "expense" && (
              <>
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency Name</FormLabel>
                      <FormControl>
                        <Input placeholder="$" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Uncategorized" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expenseCategory.toReversed().map((category) => (
                            <SelectItem key={category.id} value={`${category.id}`}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <br />
            <DrawerClose asChild>
              <Button type="submit" className="w-full">
                Add
              </Button>
            </DrawerClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
