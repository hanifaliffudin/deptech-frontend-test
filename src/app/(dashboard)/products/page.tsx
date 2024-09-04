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
import { fetchDeleteProduct, fetchListProducts } from "@/app/api/products";

const ListProducts = () => {
  const router = useRouter();
  const [listProducts, setListProducts] = useState<any>([]);

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const res = await fetchListProducts();
        setListProducts([...res]);
      } catch (error) {
        console.log(error);
      }
    };

    getListProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteProduct(id);
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
        <h1 className="font-bold text-xl">Products</h1>
        <Button onClick={() => router.push("/products/add")}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Picture</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listProducts.map((product: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.picture}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
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
                      href={"/products/view/" + product.id}
                    >
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                    <Link
                      className="cursor-pointer"
                      href={"/products/edit/" + product.id}
                    >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => handleDelete(product.id)}>
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

export default ListProducts;
