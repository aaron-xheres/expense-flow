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

type ExpenseData = {
  id: number;
  name: string;
  amount: number;
  description?: string;
};