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
import { fetchDeleteAdmin, fetchListAdmins } from "@/app/api/admins";
import { useRouter } from "next/navigation";

const ListAdmins = () => {
  const router = useRouter();
  const [listAdmins, setListAdmins] = useState<any>([]);

  useEffect(() => {
    const getListAdmins = async () => {
      try {
        const res = await fetchListAdmins();
        setListAdmins([...res]);
      } catch (error) {
        console.log(error);
      }
    };

    getListAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteAdmin(id);
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
        <h1 className="font-bold text-xl">Admins</h1>
        <Button onClick={() => router.push("/admins/add")}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listAdmins.map((admin: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{admin.firstName}</TableCell>
              <TableCell>{admin.lastName}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.dateOfBirth}</TableCell>
              <TableCell>{admin.gender}</TableCell>
              <TableCell>{admin.password}</TableCell>
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
                      href={"/admins/view/" + admin.id}
                    >
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                    <Link
                      className="cursor-pointer"
                      href={"/admins/edit/" + admin.id}
                    >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => handleDelete(admin.id)}>
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

export default ListAdmins;
