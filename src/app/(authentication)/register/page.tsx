"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { registerUser } from "@/app/api/api";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import SmallScreenLogo from "@/components/navbar/components/SmallScreenLogo";

// Define the validation schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z
    .enum(["ORGANIZER", "CUSTOMER"])
    .refine((value) => ["ORGANIZER", "CUSTOMER"].includes(value), {
      message: "Please select a role",
    }),
});

type FormData = z.infer<typeof schema>;

const RegisterPage: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await registerUser(data);

      toast({
        title: response?.message,
        description: "You have successfully registered! Please login.",
      });
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("An unexpected error occurred. Please try again.");

      // Optionally show the error in a toast
      toast({
        title: "Error",
        description: "Failed to register. Email already exists.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center mx-auto w-full">
      <div className="lg:w-[330px] w-full h-fit flex flex-col gap-4 mx-auto px-8">
        <div className="w-auto h-[40px] mb-4">
          <SmallScreenLogo />
        </div>
        <h1 className="text-2xl font-bold mt-6 mb-4">Register new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="border border-gray-300 p-2 rounded text-black w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-[14px]">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border border-gray-300 p-2 rounded text-black w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-[14px]">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="border border-gray-300 p-2 rounded text-black w-full"
            />
            {errors.password && (
              <span className="text-red-500 text-[14px]">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="border border-gray-300 p-2 rounded text-black w-full"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-[14px]">
                {errors.role.message}
              </span>
            )}
          </div>
          <div className="mt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </div>
          <Separator className="my-2" />
          <p className="text-[14px]">Already have an account?</p>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
