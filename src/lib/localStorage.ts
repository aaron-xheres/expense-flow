import * as CONST from "@/consts";

/*
  DEV USE ONLY
*/

export const ls_setTestExpenses = (id: number = 0) => {
  console.warn("[!] Setting Test Local Storage Data");
  const expenseId = id;

  const expense: Expense = {
    id: expenseId,
    name: "Test Expense",
    currency: "T$",
    total: 99.99,
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
  const r = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST);
  return r ? JSON.parse(r) : [];
};

export const ls_getExpenseCategories = (): ExpenseCategory[] => {
  const r = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY);
  return r ? JSON.parse(r) : [];
};

export const ls_getExpenseCategoryById = (id: number): ExpenseCategory | null => {
  const categories = ls_getExpenseCategories();
  const r = categories.find((category) => category.id === id);
  return r ?? null;
};

export const ls_getExpenseDataById = (id: string): ExpenseData | null => {
  const r = localStorage.getItem(`${CONST.LOCALSTORAGE_KEY.EXPENSE_PREFIX}${id}`);
  return r ? JSON.parse(r) : r;
};

export const ls_ensureDefaultExists = (): void => {
  const expenseList = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST);
  if (!expenseList) {
    localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST, "[]");
  }

  const expenseCategory = localStorage.getItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY);
  if (!expenseCategory) {
    localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY, `[${JSON.stringify(CONST.DEFAULT_EXPENSE_CATEGORY)}]`);
  }
};


export const ls_addExpenseCategory = (category: ExpenseCategory): void => {
  const categories = ls_getExpenseCategories()
  categories.push(category)
  localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY, JSON.stringify(categories))
}

export const ls_addExpenseList = (categoryId: number, expense: Expense): void => {
  const categories = ls_getExpenseCategories();
  const idx = categories.findIndex((c) => c.id === categoryId)
  if(idx === null) {
    throw new Error('[ls_addExpenseList] invalid category id')
  }

  categories[idx].list.push(expense.id)

  const list = ls_getExpenseList();
  list.push(expense);

  localStorage.setItem(`${CONST.LOCALSTORAGE_KEY.EXPENSE_PREFIX}${expense.id}`, '[]')
  localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_LIST, JSON.stringify(list))
  localStorage.setItem(CONST.LOCALSTORAGE_KEY.EXPENSE_CATEGORY, JSON.stringify(categories))
}