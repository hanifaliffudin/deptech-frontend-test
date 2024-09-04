"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginAdmin } from "../../api/auth";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle login
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await LoginAdmin(email, password);

      if (res.code !== 200) {
        toast({
          title: "Error " + res.code,
          description: res.message,
        });
      } else {
        localStorage.setItem("account", JSON.stringify(res.user));
        router.push("/admins");
      }
    } catch (error) {
      toast({
        title: "Error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  placeholder="email"
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>
              <Button disabled={isLoading} type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;
