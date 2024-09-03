"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-10 w-52 hidden flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            className={pathname.includes("/admins") ? "font-bold text-lg" : ""}
            href={"/admins"}
          >
            Admins
          </Link>
          <Link
            className={
              pathname === "/product-categories" ? "font-bold text-lg" : ""
            }
            href={"/product-categories"}
          >
            Product Categories
          </Link>
          <Link
            className={pathname === "/products" ? "font-bold text-lg" : ""}
            href={"/products"}
          >
            Products
          </Link>
          <Link
            className={pathname === "/transactions" ? "font-bold text-lg" : ""}
            href={"/transactions"}
          >
            Transactions
          </Link>
        </nav>
      </aside>
      <main className="pl-52 bg-muted/40 h-screen">
        <div className="flex shadow z-10 bg-white w-full pr-56 fixed h-14 justify-end items-center p-4 font-semibold">
          <Button variant="link" className="text-red-500">
            Logout
          </Button>
        </div>
        <div className="h-16"></div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
