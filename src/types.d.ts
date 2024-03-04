type ExpenseCategory = {
  id: number;
  name: string;
  list: number[];
};

type Expense = {
  id: number;
  name: string;
  currency: string;
  total: number;
};

type ExpenseEntry = {
  id?: number;
  title: string;
  amount: number;
  tag: string;
  description?: string;
  entryOf: number;
};
