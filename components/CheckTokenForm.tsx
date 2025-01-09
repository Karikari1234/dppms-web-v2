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
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import mOnSubmit from "./OnSubmitMeterNo";
import { useTokenResStore } from "@/lib/global/store";
import { Locale } from "@/i18n";

const formSchema = z.object({
  meterNo: z
    .string({
      required_error: "Meter Number is required",
    })
    .min(12, {
      message: "Minimum 12 digits required",
    }),
});

interface CheckInput {
  meterNo: string;
}

const defaultCheckInput: CheckInput = {
  meterNo: "010100000010",
};

const translation = {
  en: {
    title: "Check Last 3 Recharge Token Numbers",
    meterNoLabel: "Meter No",
    meterNoPlaceholder: "Input your 12 digit meter number",
    meterNoDescription: "Provide meter number.",
    submit: "Submit",
    captchaError: "Please verify that you are not a robot.",
    captchaReload: "Reload and try again.",
    loading: "Loading...",
  },
  bn: {
    title: "সর্বশেষ ৩টি রিচার্জ টোকেন নম্বর চেক করুন",
    meterNoLabel: "মিটার নম্বর",
    meterNoPlaceholder: "আপনার ১২ ডিজিটের মিটার নম্বর দিন",
    meterNoDescription: "মিটার নম্বর প্রদান করুন।",
    submit: "জমা দিন",
    captchaError: "দয়া করে নিশ্চিত করুন যে আপনি রোবট নন।",
    captchaReload: "রিলোড করুন এবং আবার চেষ্টা করুন।",
    loading: "লোড হচ্ছে...",
  },
};

export function CheckInputForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const { responseBody, setResponseBody } = useTokenResStore();

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => {
        setIsverified(true);
      })
      .catch(() => {
        setIsverified(false);
      });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isVerified) {
        const resObj = await mOnSubmit(values);
        setResponseBody(null);
        setResponseBody(resObj);
        router.push("/token-check/tokens");
      } else {
        toast({
          title: translation[locale].captchaError,
          description: translation[locale].captchaReload,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [key, setKey] = useState(0);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        key={key}
      >
        <h1 className="text-2xl font-bold">{translation[locale].title}</h1>

        <div className="text-lg">
          <FormField
            control={form.control}
            name="meterNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translation[locale].meterNoLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={translation[locale].meterNoPlaceholder}
                    {...form.register("meterNo")}
                  />
                </FormControl>
                <FormDescription>
                  {translation[locale].meterNoDescription}
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
          <Button
            className="w-full bg-green"
            type="submit"
            disabled={!isVerified || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <div
                className="m-12d inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  {translation[locale].loading}
                </span>
              </div>
            )}
            {translation[locale].submit}
          </Button>
        </div>
      </form>
    </Form>
  );
}
