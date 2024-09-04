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
import { fetchDeleteCategory, fetchListCategories } from "@/app/api/categories";

const ListCategories = () => {
  const router = useRouter();
  const [listCategories, setListCategories] = useState<any>([]);

  useEffect(() => {
    const getListCategories = async () => {
      try {
        const res = await fetchListCategories();
        setListCategories([...res]);
      } catch (error) {
        console.log(error);
      }
    };

    getListCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteCategory(id);
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
        <h1 className="font-bold text-xl">Product Categories</h1>
        <Button onClick={() => router.push("/product-categories/add")}>
          Add
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listCategories.map((category: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
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
                      href={"/product-categories/view/" + category.id}
                    >
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                    <Link
                      className="cursor-pointer"
                      href={"/product-categories/edit/" + category.id}
                    >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => handleDelete(category.id)}>
                      Delete
                    </DropdownMenuItem>
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

export default ListCategories;
