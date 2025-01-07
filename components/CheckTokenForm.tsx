"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/app/serverActions";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import mOnSubmit from "./OnSubmitMeterNo";
import { useTokenResStore } from "@/lib/global/store";
import { Locale } from "@/i18n"; // Assuming you have a Locale type
import { getTranslation, TranslationKey } from "@/lib/i18n/getTranslation";


// Zod schema
const formSchema = z.object({
  meterNo: z
    .string({
      required_error: "Meter Number is required",
    })
    .min(12, {
      message: "Minimum 12 digits required",
    }),
});

export function CheckInputForm({ locale }: { locale: Locale }) {
  const [translation, setTranslation] = useState<TranslationKey>(
    () => (key: string) => key,
  );

  // Load the translation function
  useEffect(() => {
    async function loadTranslation() {
      try {
        const translationFn = await getTranslation(locale);
        setTranslation(() => translationFn); // Set the loaded translation function
      } catch (error) {
        console.error("Error loading translation:", error);
      }
    }
    loadTranslation();
  }, [locale]);

  const router = useRouter();
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const { setResponseBody } = useTokenResStore();

  async function handleCaptchaSubmission(token: string | null) {
    try {
      await verifyCaptcha(token);
      setIsVerified(true);
    } catch {
      setIsVerified(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isVerified) {
        const resObj = await mOnSubmit(values);
        setResponseBody(resObj);
        router.push("/token-check/tokens");
      } else {
        toast({
          title: translation("tokenCheck.captchaError"),
          description: translation("tokenCheck.reloadError"),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-2xl font-bold">
          {translation("tokenCheck.title")}
        </h1>

        <div className="text-lg">
          <FormField
            control={form.control}
            name="meterNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translation("tokenCheck.meterNo")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={translation("tokenCheck.placeholder")}
                    {...form.register("meterNo")}
                  />
                </FormControl>
                <FormDescription>
                  {translation("tokenCheck.provideMeter")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
        </div>

        <div className="space-x-4">
          <Button className="w-full bg-green" type="submit">
            {form.formState.isSubmitting ? (
              <span className="inline-block">
                {translation("tokenCheck.loading")}
              </span>
            ) : (
              translation("tokenCheck.submit")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
