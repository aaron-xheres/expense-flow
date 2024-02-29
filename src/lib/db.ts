import Dexie, { Table } from "dexie";

export class Database extends Dexie {
  expenseCategory!: Table<ExpenseCategory>;
  expenseList!: Table<Expense>;

  constructor() {
    super("expense-flow_db");
    this.version(1).stores({
      expenseCategory: "id, *list",
      expenseList: "id",
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
