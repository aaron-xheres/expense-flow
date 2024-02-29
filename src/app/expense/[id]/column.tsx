"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ExpenseData>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'badge',
    header: 'Description'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
]