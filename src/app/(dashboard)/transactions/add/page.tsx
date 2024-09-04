"use client";

import { fetchListProducts } from "@/app/api/products";
import { fetchAddTransaction } from "@/app/api/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddTransaction = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [type, setType] = useState("");
  const [productId, setProductId] = useState<any>("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<any>([]);
  const [listProductsExisting, setListProductsExisting] = useState<any>([]);

  const [errors, setErrors] = useState<any>({});

  const addData = async () => {
    try {
      const res = await fetchAddTransaction({
        type,
        products,
      });
      toast({
        title: "Success",
      });

      setTimeout(() => {
        router.push("/transactions");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // Validate form
  const validateForm = () => {
    let errors: any = {};

    if (!type) {
      errors.type = "Type is required.";
    }

    if (!products.length) {
      errors.products = "Description is required.";
    }

    setErrors(errors);
  };

  // Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateForm();
    if (!Object.keys(errors).length) {
      addData();
      console.log("Form submitted successfully!");
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  const handleAddProduct = () => {
    if (
      // if type is out and stock lower than quantity
      listProductsExisting.find((p: any) => p.id == productId).stock <
        quantity &&
      type === "Out"
    ) {
      alert("Quantity more than stock of product");
    } else {
      // else
      setProducts([
        ...products,
        {
          product: listProductsExisting.find((p: any) => p.id == productId),
          quantity: quantity,
        },
      ]);
      setListProductsExisting(
        listProductsExisting.filter((p: any) => p.id !== productId)
      );
      setProductId("");
      setQuantity(1);
    }
  };

  useEffect(() => {
    // get existing products
    const getListProductsExisting = async () => {
      try {
        const res = await fetchListProducts();
        setListProductsExisting([...res]);
      } catch (error) {
        console.log(error);
      }
    };

    getListProductsExisting();
  }, []);

  console.log(products);

  return (
    <div className="p-4">
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer mb-4"
        width={18}
      />
      <h1 className="font-semibold mb-2">Add Transaction</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <div>
          <Label>Type</Label>
          <Select required onValueChange={(value) => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In">In</SelectItem>
              <SelectItem value="Out">Out</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <span className="text-red-500 text-xs">{errors.type}</span>
          )}
        </div>

        {type && (
          <div>
            <Label htmlFor="description">Products</Label>
            {products.map((p: any, i: number) => {
              return (
                <li className="mb-1" key={i}>
                  {p.product.name} {p.quantity} item{p.quantity > 1 ? "s" : ""}
                </li>
              );
            })}
            <div className="flex gap-2">
              <Select
                disabled={!listProductsExisting.length}
                required
                onValueChange={(value) => setProductId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Products" />
                </SelectTrigger>
                <SelectContent>
                  {listProductsExisting.length &&
                    listProductsExisting.map((product: any, i: number) => (
                      <SelectItem key={i} value={product.id}>
                        {product.name}: {product.stock} item
                        {product.stock > 1 ? "s" : ""} available
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20"
                min={1}
                type="number"
              />
              <Button
                disabled={!productId}
                onClick={() => handleAddProduct()}
                type="button"
                variant="secondary"
              >
                Add
              </Button>
            </div>
          </div>
        )}

        <Button disabled={!products.length} type="submit">
          Submit
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddTransaction;
