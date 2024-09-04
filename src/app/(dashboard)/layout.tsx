"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const account = localStorage.getItem("account");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (account) {
      const parsed = JSON.parse(account);
      setEmail(parsed.email);
    } else {
      router.push("/login");
    }
  }, []);

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
        <div className="flex shadow z-10 bg-white w-full pr-56 fixed h-14 justify-between items-center p-4 font-semibold">
          <div>{email}</div>
          <Button
            onClick={() => {
              localStorage.removeItem("account");
              router.push("/login");
            }}
            variant="link"
            className="text-red-500"
          >
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
