"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ButtonDeleteExpenseEntry } from "@/components/buttonDeleteExpenseEntry";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  currency?: string;
  expenseEntries?: ExpenseEntry[];
};

export default function ExpenseTable(props: Props) {
  return (
    <Table>
      <TableHeader className="border-b-2">
        <TableRow className="hover:bg-inherit">
          <TableHead className="min-w-full pl-4">Title</TableHead>
          <TableHead className="w-32 pr-8 text-left">Amount</TableHead>  
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-inherit">
          <TableCell colSpan={2}>
            <Accordion type="single" collapsible className="w-full">
              {props.expenseEntries && props.expenseEntries.length > 0 ? (
                props.expenseEntries.map((entry) => (
                  <AccordionItem key={entry.id} value={`${entry.id}`}>
                    <AccordionTrigger className="w-full decoration-transparent">
                      <div className="mr-2 flex w-32 flex-grow self-start">
                        <Badge variant="secondary" className="mr-2 w-7 justify-center">
                          {entry.tag === "none" ? "-" : entry.tag}
                        </Badge>
                        <p>{entry.title}</p>
                      </div>
                      <div className="flex w-24 self-end pr-4">
                        {props.currency}
                        {(Math.round(entry.amount * 100) / 100).toFixed(2)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-row items-center justify-center align-middle">
                        <div className="flex flex-grow">
                          <p className={cn("font-light", entry.description && entry.description !== "" ? "" : "text-secondary")}>
                            {entry.description && entry.description !== "" ? entry.description : "No Description"}
                          </p>
                        </div>
                        <ButtonDeleteExpenseEntry className="ml-auto" entry={entry} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div></div>
              )}
            </Accordion>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
