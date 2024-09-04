"use client";

import { fetchDeleteCategory, fetchDetailCategory } from "@/app/api/categories";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DetailCategory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteCategory(id);
      setTimeout(() => {
        router.push("/product-categories");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchDetailCategory(params.id);
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
          <Link href={"/product-categories/edit/" + data.id}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(data.id)} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
      <h1 className="font-semibold text-xl mb-2">Detail Category</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>: {data.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>: {data.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailCategory;
