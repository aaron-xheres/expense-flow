import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

import * as CONST from '@/consts'

export const state_expenseList = atomWithImmer<Expense[]>([]);
export const state_expenseCategory = atomWithImmer<ExpenseCategory[]>([]);