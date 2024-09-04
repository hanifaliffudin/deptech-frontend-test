"use client";

import { fetchListCategories } from "@/app/api/categories";
import { fetchAddProduct } from "@/app/api/products";
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
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const [listCategories, setListCategories] = useState<any>([]);

  const addData = async () => {
    try {
      const res = await fetchAddProduct({
        name,
        description,
        picture,
        category,
        stock,
      });
      toast({
        title: "Success",
      });
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // Validate form
  const validateForm = () => {
    let errors: any = {};

    if (!name) {
      errors.name = "First Name is required.";
    }

    if (!description) {
      errors.description = "Last Name is required.";
    }

    if (!picture) {
      errors.picture = "Picture is required.";
    }

    if (!category) {
      errors.category = "Date Of Birth is required.";
    }

    if (!stock) {
      errors.stock = "Stock is required.";
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

  return (
    <div className="p-4">
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer mb-4"
        width={18}
      />
      <h1 className="font-semibold mb-2">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">{errors.description}</span>
          )}
        </div>

        <div>
          <Label htmlFor="picture">Picture</Label>
          <Input
            required
            name="picture"
            type="picture"
            placeholder="https://yourimage.com"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          {errors.picture && (
            <span className="text-red-500 text-xs">{errors.picture}</span>
          )}
        </div>

        <div>
          <Label>Category</Label>
          <Select
            disabled={!listCategories.length}
            required
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {listCategories.length &&
                listCategories.map((cat: any) => (
                  <SelectItem value={cat.name}>{cat.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.stock && (
            <span className="text-red-500 text-xs">{errors.stock}</span>
          )}
        </div>

        <div>
          <Label>Stock</Label>
          <Input
            required
            onChange={(e) => setStock(Number(e.target.value))}
            type="number"
            min={0}
          />
          {errors.stock && (
            <span className="text-red-500 text-xs">{errors.stock}</span>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProduct;
