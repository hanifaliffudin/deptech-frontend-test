"use client";

import { fetchDeleteProduct, fetchDetailProduct } from "@/app/api/products";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProduct = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  const handleDelete = async (id: string) => {
    try {
      const res = await fetchDeleteProduct(id);
      setTimeout(() => {
        router.push("/products");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchDetailProduct(params.id);
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
          <Link href={"/products/edit/" + data.id}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(data.id)} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
      <h1 className="font-semibold text-xl mb-2">Detail Product</h1>
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
          <tr>
            <td>Picture</td>
            <td>: {data.picture}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>: {data.category}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {data.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailProduct;
