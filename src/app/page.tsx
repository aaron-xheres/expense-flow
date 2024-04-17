"use client";

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-full min-w-full items-center justify-center">
      <div className="p-4">
        <Card>
          <CardHeader className="items-center justify-center text-center">
            <CardTitle className="text-xl underline decoration-1 underline-offset-4">Welcome to Expense Flow</CardTitle>
            <br />
            <CardDescription>Minimalistc expense tracking with folders to help organize and segregate different forms of expenses</CardDescription>
          </CardHeader>
          <CardContent className="mt-4 text-center text-sm">
            <p>Swipe from left to right, or click on the [☰] button to open up the expenses drawer</p>
            <br />
            <Separator />
            <br />
            <p>Do note that this is currently developed for mobile/tablet devices only, desktop experience may vary</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
