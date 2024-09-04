"use client";

import { fetchAddAdmin } from "@/app/api/admins";
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
import React, { useState } from "react";

const AddAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const addData = async () => {
    try {
      const res = await fetchAddAdmin({
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        password,
      });
      toast({
        title: "Success",
      });
      setTimeout(() => {
        router.push("/admins");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // Validate form
  const validateForm = () => {
    let errors: any = {};

    if (!firstName) {
      errors.firstName = "First Name is required.";
    }

    if (!lastName) {
      errors.lastName = "Last Name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date Of Birth is required.";
    }

    if (!gender) {
      errors.gender = "Gender is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
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
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <div className="p-4">
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer mb-4"
        width={18}
      />
      <h1 className="font-semibold mb-2">Add Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            required
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">{errors.firstName}</span>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            required
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">{errors.lastName}</span>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        <div>
          <Label>Gender</Label>
          <Select required onValueChange={(value) => setGender(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <span className="text-red-500 text-xs">{errors.gender}</span>
          )}
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-fit"
            type="date"
          />
          {errors.dateOfBirth && (
            <span className="text-red-500 text-xs">{errors.dateOfBirth}</span>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddAdmin;
