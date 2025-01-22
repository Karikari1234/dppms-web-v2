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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Source_Code_Pro } from "next/font/google";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, isBefore, parseISO, startOfMonth, subMonths, differenceInMonths } from "date-fns";
import { Locale } from "@/i18n";
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const formSchema = z.object({
  rechargeAmount: z.number().min(200, {
    message: "Minimum 200 {t.common.currency} needs to be recharged",
  }),
  sanctionLoad: z.number().min(2, {
    message: "Sanction load can't be less than 2kWh.",
  }),
  firstTime: z.enum(["yes", "no"], {
    required_error: "You need to select one option.",
  }),
  ownedBy: z.enum(["bpdb", "customer"], {
    required_error: "You need to select one option.",
  }),
  // previousVendingMonths: z
  //   .number().min(0, {
  //     message: "Previous vending months can't be less than 0.",
  //   }),
    previousVendingDate: z
    .date()
    .refine((date) => {
      //const selectedDate = parseISO(date);
      const currentMonthStart = startOfMonth(new Date());
      return isBefore(date, currentMonthStart);
    }, {
      message: "The date must be from a previous month.",
    }),
});

interface MeterCharges {
  rechargeAmount: number;
  vat: number;
  demandCharge: number;
  meterRent: number;
  totalCharge: number;
  rebate: number;
  totalEnergy: number;
  previousMonthsDemandCharge: number;
  previousMonthsMeterCharge: number;
  previousMonthsCharges: number;
  previousVendingMonthsCount: number;
  ownedBy?: string;
  firstTime?: string;
}

const defaultMeterCharges: MeterCharges = {
  rechargeAmount: 0.0,
  vat: 0.0,
  demandCharge: 0.0,
  meterRent: 0.0,
  totalCharge: 0.0,
  rebate: 0.0,
  totalEnergy: 0.0,
  previousMonthsDemandCharge: 0.0,
  previousMonthsMeterCharge: 0.0,
  previousMonthsCharges: 0.0,
  previousVendingMonthsCount: 0,
  ownedBy: "",
  firstTime: "",
};

const translation = {
  bn: {
    common: {
      currency: "টাকা",
      submit: "জমা দিন",
      reset: "রিসেট করুন",
      yes: "হ্যাঁ",
      no: "না",
      bpdb: "বিউবো",
      customer: "গ্রাহক",
      month: "মাস"
    },
    energyCalculator: {
      title: "প্রিপেইড মিটার এনার্জি ক্যালকুলেটর",
      rechargeAmountLabel: "মোট রিচার্জ পরিমাণ (টাকা)",
      rechargeAmountDescription: "রিচার্জের জন্য প্রদত্ত পরিমাণ।",
      sanctionLoadLabel: "মিটার অনুমোদিত লোড (kWh)",
      sanctionLoadDescription: "অনুমোদিত লোডের জন্য প্রদত্ত পরিমাণ।",
      firstTimeLabel: "এই মাসে প্রথমবার রিচার্জ করছেন?",
      meterOwnerLabel: "মিটার মালিক",
      previousVendingLabel: "পূর্ববর্তী ভেন্ডিং এর তারিখ?",
      resultTitle: "আপনার মিটার চার্জ",
      demandCharge: "ডিমান্ড চার্জ",
      meterRent: "মিটার ভাড়া",
      previousMonthsDemandCharges: "মোট বকেয়া ডিমান্ড চার্জ",
      previousMonthsMeterCharges: "মোট বকেয়া মিটার ভাড়া",
      previousMonthsCharges: "মোট বকেয়া চার্জ",
      vat: "ভ্যাট",
      rebate: "ছাড়",
      totalCharge: "মোট চার্জ",
      totalEnergyAmount: "মোট এনার্জি পরিমাণ",
      firstTimeDescription: "প্রথমবার রিচার্জ করলে মিটার ভাড়া এবং ডিমান্ড চার্জ কেটে নেওয়া হবে।",
      meterOwnerDescription: "মিটারটি বিউবো বা গ্রাহকের মালিকানাধীন। যদি গ্রাহক মিটারের মালিক হন, তবে মাসিক মিটার ভাড়া চার্জ করা হবে না।",
      previousVendingDescription: "আপনার পূর্ববর্তী ভেন্ডিং এর তারিখ প্রদান করুন।",
      meterSelectPlaceholder: "গ্রাহক বা বিউবো নির্বাচন করুন",
    },
  },
  en: {
    common: {
      currency: "BDT",
      submit: "Submit",
      reset: "Reset",
      yes: "Yes",
      no: "No",
      bpdb: "BPDB",
      customer: "Customer",
      month: "Month",
    },
    energyCalculator: {
      title: "Prepaid Meter Energy Calculator",
      rechargeAmountLabel: "Total Recharge Amount (BDT)",
      rechargeAmountDescription: "Provide the amount to be recharged.",
      sanctionLoadLabel: "Meter Sanction Load (kWh)",
      sanctionLoadDescription: "Provide Sanction Load Amount.",
      firstTimeLabel: "Is this your first recharge this month?",
      firstTimeDescription: "Recharging first time will deduct meter rent and demand charges.",
      meterOwnerLabel: "Meter Owner",
      meterOwnerDescription: " Meter is owned by BPDB or customer. If customer owns the meter, then no meter rent will be charged monthly.",
      previousVendingLabel: "Previous Vending Date?",
      previousVendingDescription: "Provide the date of your previous vending.",
      resultTitle: "Your Meter Charges",
      demandCharge: "Demand Charge",
      meterRent: "Meter Rent",
      previousMonthsDemandCharges: "Total Arrear Demand Charges",
      previousMonthsMeterCharges: "Total Arrear Meter Rents",
      previousMonthsCharges: "Total Arrear Charges",
      vat: "VAT",
      rebate: "Rebate",
      totalCharge: "Total Charge",
      totalEnergyAmount: "Total Energy Amount",
      meterSelectPlaceholder: "Select customer or BPDB",
    },
  },
}

function calculateMonthDifferenceFromSysdate(inputDate: Date): number {
  const sysdate = new Date(); // System date

  // Validate the input date
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }

  // Extract year and month from both dates
  const currentYear = sysdate.getFullYear();
  const currentMonth = sysdate.getMonth(); // 0-based (January = 0)
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth(); // 0-based

  // Calculate the total months for both dates
  const totalMonthsSysdate = currentYear * 12 + currentMonth;
  const totalMonthsInputDate = inputYear * 12 + inputMonth;

  // Calculate the difference
  const monthDifference = totalMonthsSysdate - totalMonthsInputDate;

  // Ensure the result is non-negative
  return monthDifference > 0 ? monthDifference : 0;
}


export function EnergyCalculatorForm({ locale }: { locale: Locale }) {
  //const translation = getTranslation(locale);
  const t = translation[locale];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  //const toast = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const previousVendingMonths: number = calculateMonthDifferenceFromSysdate(values.previousVendingDate) - 1;
    //console.log(previousVendingMonths);
    const vat: number = (values.rechargeAmount * 5) / 105;
    const demandCharge: number =
      values.firstTime == "yes" ? values.sanctionLoad * parseFloat(process.env.NEXT_PUBLIC_DEMAND_CHARGE || "42") : 0.0;
    const meterRent: number =
      values.ownedBy == "bpdb" && values.firstTime == "yes" ? parseFloat( process.env.NEXT_PUBLIC_METER_RENT || "40") : 0.0;
    const previousVendingMonthsDemandCharge: number = previousVendingMonths > 0 ? previousVendingMonths * (parseFloat(process.env.NEXT_PUBLIC_DEMAND_CHARGE || "42") * values.sanctionLoad) : 0.0;
    const previousVendingMonthsMeterCharge: number = previousVendingMonths > 0 && values.ownedBy == "bpdb" ? previousVendingMonths * (parseFloat(process.env.NEXT_PUBLIC_METER_RENT || "40")) : 0.0;
    const previousMonthsCharges: number = previousVendingMonthsDemandCharge + previousVendingMonthsMeterCharge;
      //previousVendingMonths > 0 && values.ownedBy == "bpdb" ? previousVendingMonths * (parseFloat(process.env.NEXT_PUBLIC_DEMAND_CHARGE || "42") * values.sanctionLoad + parseFloat( process.env.NEXT_PUBLIC_METER_RENT || "40")) : previousVendingMonths > 0 && values.ownedBy != "bpdb" ? previousVendingMonths * (parseFloat(process.env.NEXT_PUBLIC_DEMAND_CHARGE || "42") * values.sanctionLoad) : 0.0;
    const totalCharge: number = vat + demandCharge + meterRent + previousMonthsCharges;
    const rebate: number =
      (.5 / 100.5) * (values.rechargeAmount - vat - meterRent);
    const totalEnergy: number = values.rechargeAmount - totalCharge + rebate;
    const previousVendingMonthsCount: number = previousVendingMonths;
    let result: MeterCharges = {
      ...defaultMeterCharges,
      rechargeAmount: values.rechargeAmount.toFixed(2) as unknown as number,
      vat: vat.toFixed(2) as unknown as number,
      demandCharge: demandCharge.toFixed(2) as unknown as number,
      meterRent: meterRent.toFixed(2) as unknown as number,
      totalCharge: totalCharge.toFixed(2) as unknown as number,
      rebate: rebate.toFixed(2) as unknown as number,
      totalEnergy: totalEnergy.toFixed(2) as unknown as number,
      previousMonthsDemandCharge: previousVendingMonthsDemandCharge.toFixed(2) as unknown as number,
      previousMonthsMeterCharge:  previousVendingMonthsMeterCharge.toFixed(2) as unknown as number,
      previousMonthsCharges: previousMonthsCharges.toFixed(2) as unknown as number,
      previousVendingMonthsCount: previousVendingMonthsCount as unknown as number
    };
    //console.log(res);
    toast({
      title: t.energyCalculator.resultTitle,
      description: (
        <div className={`text-md rounded-sm bg-toast-success p-2 text-white`}>
          <div className="space-y-1">
            
          <div>
            {t.energyCalculator.rechargeAmountLabel}:{" "}
              {result.rechargeAmount} {t.common.currency}
            </div>
            <div>
            {t.energyCalculator.demandCharge}:{" "}
              {result.demandCharge} {t.common.currency}
            </div>
            <div>{t.energyCalculator.meterRent}: {result.meterRent} {t.common.currency}</div>
            <div>{t.energyCalculator.previousMonthsDemandCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsDemandCharge} {t.common.currency}</div>
            <div>{t.energyCalculator.previousMonthsMeterCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsMeterCharge} {t.common.currency}</div>
            {/* <div>{t.energyCalculator.previousMonthsCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsCharges} {t.common.currency}</div> */}
            <div>{t.energyCalculator.vat}: {result.vat} {t.common.currency}</div>
            <div>{t.energyCalculator.rebate}: -{result.rebate} {t.common.currency}</div>
	          <div>{t.energyCalculator.totalCharge}: {result.totalCharge} {t.common.currency}</div>
            <div className="font-semibold">
              <span className="font-semibold">{t.energyCalculator.totalEnergyAmount}:</span>{" "}
              {result.totalEnergy} {t.common.currency}
            </div>
          </div>
        </div>
      ),
    });
    setResult(result);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function onReset() {
    setResult(defaultMeterCharges);
    setKey(key + 1);
    form.reset();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    //document.body.style.zoom
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [result, setResult] = useState(defaultMeterCharges);
  const [key, setKey] = useState(0);
  const [firstTime, setFirstTime] = useState<string>("no");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        key={key}
      >
        <h1 className="text-3xl font-bold">{t.energyCalculator.title}</h1>
        <div
          className={`rounded-sm ${
            result == defaultMeterCharges
              ? `bg-gray-100`
              : `animate-fade  bg-toast-success text-white animate-delay-300 animate-once`
          } p-2 text-base`}
        >
          <div className="space-y-1">
            <div>
            {t.energyCalculator.rechargeAmountLabel}:{" "}
              {result.rechargeAmount} {t.common.currency}
            </div>
            <div>
            {t.energyCalculator.demandCharge}:{" "}
              {result.demandCharge} {t.common.currency}
            </div>
            <div>{t.energyCalculator.meterRent}: {result.meterRent} {t.common.currency}</div>
            <div>{t.energyCalculator.previousMonthsDemandCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsDemandCharge} {t.common.currency}</div>
            <div>{t.energyCalculator.previousMonthsMeterCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsMeterCharge} {t.common.currency}</div>
            {/* <div>{t.energyCalculator.previousMonthsCharges} ({result.previousVendingMonthsCount} {t.common.month}): {result.previousMonthsCharges} {t.common.currency}</div> */}
            <div>{t.energyCalculator.vat}: {result.vat} {t.common.currency}</div>
            <div>{t.energyCalculator.rebate}: -{result.rebate} {t.common.currency}</div>
	          <div>{t.energyCalculator.totalCharge}: {result.totalCharge} {t.common.currency}</div>
            <div className="font-semibold">
              <span className="font-semibold">{t.energyCalculator.totalEnergyAmount}:</span>{" "}
              {result.totalEnergy} {t.common.currency}
            </div>
          </div>
        </div>
        <div className="text-lg">
          <FormField
            control={form.control}
            name="rechargeAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.rechargeAmountLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...form.register("rechargeAmount", {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormDescription>
                  {t.energyCalculator.rechargeAmountDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sanctionLoad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.sanctionLoadLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2"
                    defaultValue={"2"}
                    {...form.register("sanctionLoad", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>{t.energyCalculator.sanctionLoadDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstTime"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                {t.energyCalculator.firstTimeLabel}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setFirstTime(value); // Update state
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t.common.yes}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t.common.no}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  {t.energyCalculator.firstTimeDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {firstTime === "yes" && (
          <FormField
            control={form.control}
            name="previousVendingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.previousVendingLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    // placeholder="0"
                    // defaultValue={"0"}
                    {...form.register("previousVendingDate", { valueAsDate: true })}
                  />
                </FormControl>
                <FormDescription>{t.energyCalculator.previousVendingDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          )}

          <FormField
            control={form.control}
            name="ownedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.meterOwnerLabel}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t.energyCalculator.meterSelectPlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="customer">{t.common.customer}</SelectItem>
                    <SelectItem value="bpdb">{t.common.bpdb}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                {t.energyCalculator.meterOwnerDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <div className="space-x-4">
          <Button className="bg-green" type="submit">
          {t.common.submit}
          </Button>
          <Button
            type="reset"
            className="bg-gray-200 text-black hover:bg-gray-300"
            onClick={onReset}
          >
            {t.common.reset}
          </Button>
        </div>
      </form>
    </Form>
  );
}
