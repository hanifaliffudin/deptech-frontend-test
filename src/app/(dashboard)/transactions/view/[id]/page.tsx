"use client";

import { fetchDetailTransaction } from "@/app/api/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DetailCategory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchDetailTransaction(params.id);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getDetail();
  }, []);

  return (
    <div className="p-4">
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer mb-4"
        width={18}
      />
      <h1 className="font-semibold text-xl mb-2">Detail Transaction</h1>
      <div>Type: {data.type}</div>
      <div>Products: </div>

      <Table>
        <TableHeader>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
        </TableHeader>
        <TableBody>
          {data.products?.map((p: any) => {
            return (
              <TableRow>
                <TableCell>{p.product.name}</TableCell>
                <TableCell>{p.product.category}</TableCell>
                <TableCell>{p.product.stock}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailCategory;
