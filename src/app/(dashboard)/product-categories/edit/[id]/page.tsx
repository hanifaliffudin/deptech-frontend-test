"use client";

import { fetchDetailCategory, fetchEditCategory } from "@/app/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditCategory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const editData = async () => {
    try {
      const res = await fetchEditCategory(params.id, {
        name,
        description,
      });
      console.log(res);
      toast({
        title: "Success",
      });
      setTimeout(() => {
        router.push("/product-categories");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // Validate form
  const validateForm = () => {
    let errors: any = {};

    if (!name) {
      errors.name = "Name is required.";
    }

    if (!description) {
      errors.description = "Description is required.";
    }

    setErrors(errors);
  };

  // Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateForm();
    if (!Object.keys(errors).length) {
      editData();
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDetailCategory(params.id);

        console.log(data);

        setName(data.name);
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetail();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer mb-4"
        width={18}
      />
      <h1 className="font-semibold mb-2">Edit Category</h1>
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

        <Button type="submit">Submit</Button>
      </form>
      <Toaster />
    </div>
  );
};

export default EditCategory;
