"use client";

import { fetchDeleteAdmin, fetchDetailAdmin } from "@/app/api/admins";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DetailAdmin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteAdmin(id);
      setTimeout(() => {
        router.push("/admins");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchDetailAdmin(params.id);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getDetail();
  }, []);

  return (
    <div className="p-4">
      <div className="flex mb-4 justify-between items-center">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="text-blue-500 cursor-pointer"
          width={18}
        />
        <div className="flex items-center gap-3">
          <Link href={"/admins/edit/" + data.id}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(data.id)} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
      <h1 className="font-semibold text-xl mb-2">Detail Admin</h1>
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>: {data.firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>: {data.lastName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: {data.email}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>: {data.gender}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>: {data.dateOfBirth}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>: {data.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailAdmin;
