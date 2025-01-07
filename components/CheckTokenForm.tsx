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
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import mOnSubmit from "./OnSubmitMeterNo";
import { useTokenResStore } from "@/lib/global/store";
import { Locale } from "@/i18n"; // Assuming you have a Locale type

// Define translations for English and Bangla
const translations = {
  en: {
    title: "Check Last 3 Recharge Token Numbers",
    meterNo: "Meter No",
    provideMeter: "Provide meter number.",
    placeholder: "Input your 12 digit meter number",
    submit: "Submit",
    loading: "Loading...",
    captchaError: "Please verify that you are not a robot.",
    reloadError: "Reload and try again.",
  },
  bn: {
    title: "সর্বশেষ ৩টি রিচার্জ টোকেন নম্বর চেক করুন",
    meterNo: "মিটার নম্বর",
    provideMeter: "মিটার নম্বর প্রদান করুন।",
    placeholder: "আপনার ১২ সংখ্যার মিটার নম্বর প্রদান করুন ইংরেজীতে",
    submit: "জমা দিন",
    loading: "লোড হচ্ছে...",
    captchaError: "দয়া করে নিশ্চিত করুন যে আপনি রোবট নন।",
    reloadError: "পুনরায় লোড করুন এবং আবার চেষ্টা করুন।",
  },
};

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
  const translation = translations[locale]; // Fetch translations based on locale
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
          title: translation.captchaError,
          description: translation.reloadError,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <h1 className="text-2xl font-bold">{translation.title}</h1>

        <div className="text-lg">
          <FormField
            control={form.control}
            name="meterNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translation.meterNo}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={translation.placeholder}
                    {...form.register("meterNo")}
                  />
                </FormControl>
                <FormDescription>{translation.provideMeter}</FormDescription>
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
          <Button
            className="w-full bg-green"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <span className="inline-block">{translation.loading}</span>
            ) : (
              translation.submit
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
