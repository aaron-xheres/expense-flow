import Dexie, { Table } from "dexie";

export class Database extends Dexie {
  expenseCategory!: Table<ExpenseCategory>;
  expenseList!: Table<Expense>;
  expenseEntries!: Table<ExpenseEntry>

  constructor() {
    super("expense-flow_db");
    this.version(1).stores({
      expenseCategory: "id, *list",
      expenseList: "id",
      expenseEntries: "++id, entryOf",
    });
  }
}

export const db = new Database();

export const db_addExpense = async (categoryId: number, expense: Expense) => {
  const category = await db.expenseCategory.get(categoryId);
  if (!category) {
    throw new Error(`[db_addExpense] invalid category id: no category with id ${categoryId} found`);
  }

  category.list.push(expense.id);
  db.expenseCategory.update(categoryId, category);
  db.expenseList.put(expense);
};

export const db_addExpeseEntry = async (expenseId: number, entry: ExpenseEntry) => {
  const expense = await db.expenseList.get(expenseId);
  if (!expense) {
    throw new Error(`[db_addExpenseEntry] invalid expense id: no expense with id ${expenseId} found`);
  }

  expense.total += entry.amount
  db.expenseList.update(expenseId, expense)
  db.expenseEntries.put(entry)
}