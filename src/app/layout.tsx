"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { useSwipeable } from "react-swipeable";
import { useAtom } from "jotai";

import { state_expenseCategory, state_expenseList } from "@/states";
import { ls_ensureDefaultExists, ls_getExpenseCategories, ls_getExpenseList } from "@/lib/localStorage";

import { ThemeProvider } from "@/components/themeProvider";
import { Drawer, DrawerTrigger, DrawerContentUndecorated } from "@/components/ui/drawer";
import { DrawerExpenses } from "@/components/drawerExpenses";
import { Header } from "./header";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [, setExpenseList] = useAtom(state_expenseList);
  const [expenseCategory, setExpenseCategory] = useAtom(state_expenseCategory);

  React.useEffect(() => {
    // Ensure that default Local Storage data exists
    ls_ensureDefaultExists();

    // Load Expense Data from Local Storage
    const lsExpenseList = ls_getExpenseList();
    const lsExpenseCategory = ls_getExpenseCategories();

    setExpenseList(lsExpenseList);
    setExpenseCategory(lsExpenseCategory);
  }, []);

  // Drawer Controls
  const leftDrawerButton: React.RefObject<HTMLButtonElement> = React.createRef();
  const handleSwipe = useSwipeable({
    onSwiped: (eventData) => {
      switch (eventData.dir) {
        case "Right": {
          leftDrawerButton.current?.click();
          return;
        }
        default:
          return;
      }
    },
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-svh flex-col">
            <Header drawerOpenFn={() => leftDrawerButton.current?.click()} />
            <Separator />
            <div {...handleSwipe} className="flex flex-grow justify-center">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <button className="hidden h-0 w-0" ref={leftDrawerButton} />
                </DrawerTrigger>
                <DrawerContentUndecorated className="min-h-full max-w-[80%] rounded-none">
                  <DrawerExpenses />
                </DrawerContentUndecorated>
              </Drawer>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
