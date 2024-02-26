"use client";

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { useSwipeable } from "react-swipeable";

import { ThemeProvider } from "@/components/themeProvider";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { DrawerExpenses } from "@/components/drawerExpenses";
import { Header } from "./header";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div {...handleSwipe} className="flex flex-grow">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <button className="hidden h-0 w-0" ref={leftDrawerButton} />
                </DrawerTrigger>
                <DrawerContent className="min-h-full max-w-[80%] rounded-none">
                  <DrawerExpenses />
                </DrawerContent>
              </Drawer>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
