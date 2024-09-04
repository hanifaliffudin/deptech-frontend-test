"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  fetchDeleteTransaction,
  fetchListTransactions,
} from "@/app/api/transactions";

const ListTransactions = () => {
  const router = useRouter();
  const [listTransactions, setListTransactions] = useState<any>([]);

  useEffect(() => {
    const getListTransactions = async () => {
      try {
        const res = await fetchListTransactions();
        setListTransactions([...res]);
      } catch (error) {
        console.log(error);
      }
    };

    getListTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteTransaction(id);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Transactions</h1>
        <Button onClick={() => router.push("/transactions/add")}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listTransactions.map((transaction: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                {transaction.products.map((p: any, i: number) => {
                  return (
                    <>{`${p.product.name}${
                      i !== transaction.products.length - 1 ? ", " : ""
                    }`}</>
                  );
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link
                      className="cursor-pointer"
                      href={"/transactions/view/" + transaction.id}
                    >
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListTransactions;
