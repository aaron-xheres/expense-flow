import * as CONST from "@/consts";

/*
  DEV USE ONLY
*/

export const ls_setTestExpenses = (id: number = 0) => {
  const expenseId = id;

  const expense: Expense = {
    id: expenseId,
    name: "Test Expense",
    currency: "T$",
  };

  const expenseData: ExpenseData[] = [
    {
      id: 0,
      name: "Test Spending",
      amount: 99.99,
      description: "Test Description",
    },
  ];

  const expenseCategory: ExpenseCategory = {
    id: Date.now(),
    name: "Test Category",
    list: [expenseId],
  };

  localStorage.setItem(`expenses-test${expenseId}`, JSON.stringify(expenseData));
  localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST, JSON.stringify([expense]));
  localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY, JSON.stringify([expenseCategory]));
};

/*
  ==========
*/

export const ls_getExpenseList = (): Expense[] => {
  const r = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST)
  return r ? JSON.parse(r) : []
}

export const ls_getExpenseCategories = (): ExpenseCategory[] => {
  const r = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY);
  return r ? JSON.parse(r) : []
};

export const ls_getExpenseData = (id: string): ExpenseData | null => {
  const r = localStorage.getItem(`${CONST.LOCALSTORAGE_KEY.EXPENSE_PREFIX}${id}`);
  return r ? JSON.parse(r) : r
};
