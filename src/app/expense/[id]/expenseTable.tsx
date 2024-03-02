"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  className?: string;
  currency?: string;
  expenseEntries?: ExpenseEntry[];
};

export default function ExpenseTable(props: Props) {
  console.log(props.expenseEntries);

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-full border-r pl-4">Title</TableHead>
          <TableHead className="w-24 text-left">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.expenseEntries && props.expenseEntries.length > 0 ? (
          props.expenseEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="min-w-full border-r pl-4 font-medium">
                <div className="w-full max-w-56 overflow-hidden text-ellipsis text-wrap">
                  <Badge variant="secondary" className="mr-2 min-w-7 justify-center px-1">
                    {entry.tag === 'none' ? '-' : entry.tag}
                  </Badge>
                  <span>{entry.title}</span>
                </div>
              </TableCell>
              <TableCell className="w-24 text-left">
                {props.currency} {(Math.round(entry.amount * 100) / 100).toFixed(2)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center font-medium" colSpan={2}>
              No Entries
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
