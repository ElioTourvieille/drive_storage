"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OtpModal from "./OTPModal";

type FormType = "signin" | "signup";

const authFormSchema = (formType: FormType) => {
  return z.object({
    username:
      formType === "signup" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.email(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");
  
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
    const user = await createAccount({
      username: values.username || "",
      email: values.email,
    });

    setAccountId(user.accountId as string);
    } catch {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title h1">
            {type === "signin" ? "Connexion" : "Inscription"}
          </h1>
          {type === "signup" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item border-light-300 drop-shadow-md">
                    <FormLabel className="pt-2 w-full text-md font-bold">
                      Nom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez votre nom"
                        {...field}
                        className="body-2 border-none shadow-none p-0 shad-no-focus"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-400 body-2 ml-4" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item border-light-300 drop-shadow-md">
                  <FormLabel className="pt-2 w-full text-md font-bold">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="body-2 border-none shadow-none p-0 shad-no-focus"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "signin" ? "Connexion" : "Inscription"}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin ml-2"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="error-message body-2">*{errorMessage}</p>
          )}

          <div className="flex justify-center body-2">
            <p className="flex items-center gap-2">
              {type === "signin"
                ? "Vous n'avez pas de compte ?"
                : "Vous avez déjà un compte ?"}
              <Link
                href={type === "signin" ? "/sign-up" : "/sign-in"}
                className="text-coral"
              >
                {type === "signin" ? "Inscription" : "Connexion"}
              </Link>
            </p>
          </div>
        </form>
      </Form>

      {accountId && <OtpModal email={form.getValues("email")} accountId={accountId} />}
    </>
  );
};

export default AuthForm;
