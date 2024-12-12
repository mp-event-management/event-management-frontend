"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/navbar/components/Logo";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginPage: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(data);
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result);
      if (!result?.ok) {
        router.push(
          `/login?error=${encodeURIComponent(result?.error || "unknown")}`
        );
        setError(
          result?.error || "An unexpected error occurred. Please try again."
        );
      } else if (result?.ok) {
        if (
          session?.user.roles.includes("ADMIN") ||
          session?.user.roles.includes("ORGANIZER")
        ) {
          router.push("/dashboard");
        }
        router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center mx-auto w-full">
      <div className="lg:min-w-[300px] max-w-auto h-fit flex flex-col gap-4 mx-auto">
        <div className="w-auto h-[40px] mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold mt-6 mb-4">Login account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border border-gray-300 p-2 rounded text-black"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
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
              className="border border-gray-300 p-2 rounded text-black"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
            {error && <span className="text-red-500">{error}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
