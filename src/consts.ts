export const IDB_STORES = {
  EXPENSE_PREFIX: "expense-",
  EXPENSE_LIST: "expense-list",
  EXPENSE_CATEGORY: "expense-category",
};

export const DEFAULT_EXPENSE_CATEGORY: ExpenseCategory = {
  id: -1,
  name: "Uncategorized",
  list: [],
};

export const DEFAULT_EXPENSE: Expense = {
  id: -1,
  name: "",
  currency: "",
  total: 0,
};

export const DEFAULT_EXPENSE_DATA: ExpenseEntry = {
  id: -1,
  title: "",
  amount: 0,
  tag: "",
  entryOf: -1
};
