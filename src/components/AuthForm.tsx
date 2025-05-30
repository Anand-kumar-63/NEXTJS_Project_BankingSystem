"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Custominputform from "./Custominputform";
import { authFormSchema } from "@/lib/utils";
import { signIn, Signup } from "@/lib/actions/user.actions";


const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const authSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await Signup(userData);
        setuser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  
  };

  return (
    <section className="w-full h-screen">
      <div className="w-1/2 border-r-2 flex flex-col justify-center items-center mb-10 h-screen">
        <header className="m-4 flex flex-col mt-6 ml-10">
          <div className="flex flex-row gap-2">
            <Link href={"/home"}>
              <Image
                src={"/icons/logo.svg"}
                alt="logo"
                height={40}
                width={40}
              />
              <h1>Horizon</h1>
            </Link>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl ">
              {user
                ? "Link your Account"
                : type === "sign-in"
                ? "Sign-in"
                : "Sign-up"}
            </h1>
            <p className="text-sm text-gray-600">
              {user
                ? "link your account for further Process"
                : "Create an account"}
            </p>
          </div>
        </header>

        <div className="m-4">
          {user ? (
            <div>You are already loggedin</div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-auto space-y-1"
              >
                {type === "sign-up" && (
                  <>
                    <div className="flex gap-1">
                      <Custominputform
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                      />
                      <Custominputform
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Custominputform
                        control={form.control}
                        name="address1"
                        label="Address"
                        placeholder="Enter your specific address"
                      />
                      <Custominputform
                        control={form.control}
                        name="city"
                        label="City"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Custominputform
                        control={form.control}
                        name="state"
                        label="State"
                        placeholder="Example: NY"
                      />
                      <Custominputform
                        control={form.control}
                        name="postalCode"
                        label="Postal Code"
                        placeholder="Example: 11101"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Custominputform
                        control={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                      />
                      <Custominputform
                        control={form.control}
                        name="ssn"
                        label="SSN"
                        placeholder="Example: 1234"
                      />
                    </div>
                  </>
                )}
                <Custominputform
                  label="email"
                  placeholder="Email here"
                  name="email"
                  control={form.control}
                />
                <Custominputform
                  label="passord"
                  placeholder="password here"
                  name="password"
                  control={form.control}
                />

                <div className="flex flex-col gap-4">
                  <Button type="submit" disabled={IsLoading}>
                    {IsLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : type === "sign-in" ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>

        <footer className="flex flex-row mb-6 justify-center items-center">
          <p className="text-sm text-gray-600 font-mono">
            {type === "sign-in"
              ?"Dont have an account?"
              :"Already have an account?"}
          </p>
          <Link
            className="text-blue-500 text-sm ml-1"
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          >
            {type === "sign-in" ? "sign-up" : "sign-in"}
          </Link>
        </footer>

      </div>
    </section>
  );
};

export default AuthForm;
