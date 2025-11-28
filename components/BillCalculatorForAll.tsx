"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n";

/* ---------------------------------- TARIFF ---------------------------------- */
const TARIFFS: Record<string, { name: string; demandPerKW: number }> = {
  "LT-A": { name: "Residential", demandPerKW: 42 },
  "LT-B": { name: "Agriculture & Irrigation", demandPerKW: 42 },
  "LT-C1": { name: "SME", demandPerKW: 48 },
  "LT-C2": { name: "Construction", demandPerKW: 120 },
  "LT-D1": { name: "Education/Hospital", demandPerKW: 60 },
  "LT-D2": { name: "Water Works", demandPerKW: 90 },
  "LT-D3": { name: "Battery Charging", demandPerKW: 90 },
  "LT-E": { name: "Commercial", demandPerKW: 90 },
  "LT-T": { name: "Temporary", demandPerKW: 120 },

  "MT-1": { name: "Residential", demandPerKW: 90 },
  "MT-2": { name: "Commercial", demandPerKW: 90 },
  "MT-3": { name: "Industry", demandPerKW: 90 },
  "MT-4": { name: "Construction", demandPerKW: 120 },
  "MT-5": { name: "General", demandPerKW: 90 },
  "MT-6": { name: "Temporary", demandPerKW: 120 },
  "MT-7": { name: "Battery Charging", demandPerKW: 90 },
  "MT-8": { name: "Agriculture", demandPerKW: 90 },

  "HT-1": { name: "General", demandPerKW: 90 },
  "HT-2": { name: "Commercial", demandPerKW: 90 },
  "HT-3": { name: "Industry", demandPerKW: 90 },
  "HT-4": { name: "Construction", demandPerKW: 90 },

  "EHT-1": { name: "General", demandPerKW: 90 },
  "EHT-2": { name: "General", demandPerKW: 90 },
};

/* ---------------------------------- TRANSLATION ---------------------------------- */
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
      month: "মাস",
    },
    energyCalculator: {
      title: "প্রিপেইড মিটার এনার্জি ক্যালকুলেটর",
      rechargeAmountLabel: "মোট রিচার্জ পরিমাণ (টাকা)",
      rechargeAmountDescription: "রিচার্জের জন্য প্রদত্ত পরিমাণ।",
      sanctionLoadLabel: "মিটার অনুমোদিত লোড (kWh)",
      sanctionLoadDescription: "অনুমোদিত লোড প্রদান করুন।",
      firstTimeLabel: "এই মাসে প্রথমবার রিচার্জ করছেন?",
      firstTimeDescription: "প্রথম রিচার্জ করলে ডিমান্ড ও মিটার ভাড়া কাটা হবে।",
      meterOwnerLabel: "মিটার মালিক",
      meterOwnerDescription: "গ্রাহক মালিক হলে মিটার ভাড়া কাটা হবে না।",
      previousVendingLabel: "পূর্ববর্তী ভেন্ডিং এর তারিখ?",
      previousVendingDescription: "আপনার পূর্ববর্তী ভেন্ডিং এর তারিখ দিন।",
      tariffLabel: "ট্যারিফ",
      tariffDescription: "আপনার সংযোগের ট্যারিফ নির্বাচন করুন।",
      meterSelectPlaceholder: "গ্রাহক বা বিউবো নির্বাচন করুন",
      resultTitle: "আপনার মিটার চার্জ",
      demandCharge: "ডিমান্ড চার্জ",
      meterRent: "মিটার ভাড়া",
      previousMonthsDemandCharges: "মোট বকেয়া ডিমান্ড চার্জ",
      previousMonthsMeterCharges: "মোট বকেয়া মিটার ভাড়া",
      vat: "ভ্যাট",
      rebate: "ছাড়",
      totalCharge: "মোট চার্জ",
      totalEnergyAmount: "মোট এনার্জি",
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
      rechargeAmountLabel: "Recharge Amount (BDT)",
      rechargeAmountDescription: "Enter recharge amount.",
      sanctionLoadLabel: "Sanction Load (kWh)",
      sanctionLoadDescription: "Enter sanctioned load.",
      firstTimeLabel: "Is this your first recharge this month?",
      firstTimeDescription: "First recharge deducts demand and meter rent.",
      meterOwnerLabel: "Meter Owner",
      meterOwnerDescription: "If customer-owned, meter rent is not deducted.",
      previousVendingLabel: "Previous Vending Date?",
      previousVendingDescription: "Enter your previous vending date.",
      tariffLabel: "Tariff Class",
      tariffDescription: "Select your tariff.",
      meterSelectPlaceholder: "Select customer or BPDB",
      resultTitle: "Your Meter Charges",
      demandCharge: "Demand Charge",
      meterRent: "Meter Rent",
      previousMonthsDemandCharges: "Arrear Demand Charge",
      previousMonthsMeterCharges: "Arrear Meter Rent",
      vat: "VAT",
      rebate: "Rebate",
      totalCharge: "Total Charge",
      totalEnergyAmount: "Energy Amount",
    },
  },
};

/* ---------------------------------- HELPERS ---------------------------------- */
function safeDate(val: any): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function calcMonths(input: Date | null): number {
  if (!input) return 0;
  const now = new Date();
  const diff =
    now.getFullYear() * 12 +
    now.getMonth() -
    (input.getFullYear() * 12 + input.getMonth());
  return diff > 0 ? diff : 0;
}

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */
export function EnergyCalculatorForm({ locale }: { locale: Locale }) {
  const t = translation[locale];
  const [firstTime, setFirstTime] = useState("no");
  const [key, setKey] = useState(0);

  /* ---------------- ZOD SCHEMA ---------------- */
  const formSchema = useMemo(
    () =>
      z
        .object({
          rechargeAmount: z
            .number({
              invalid_type_error: t.energyCalculator.rechargeAmountLabel,
            })
            .min(200, {
              message:
                locale === "bn"
                  ? "ন্যূনতম ২০০ টাকা প্রয়োজন"
                  : "Minimum 200 BDT required",
            }),

          sanctionLoad: z
            .number()
            .min(2, {
              message:
                locale === "bn"
                  ? "অনুমোদিত লোড ২ এর কম হতে পারে না"
                  : "Sanction load must be >= 2",
            }),

          firstTime: z.enum(["yes", "no"]),

          ownedBy: z.enum(["bpdb", "customer"], {
            required_error:
              locale === "bn" ? "মিটার মালিক নির্বাচন করুন" : "Select meter owner",
          }),

          previousVendingDate: z.string().optional(),

          tariffCode: z.enum(Object.keys(TARIFFS) as any, {
            required_error: t.energyCalculator.tariffDescription,
          }),

          meterType: z.enum(["1p", "3p"]).optional(),
        })

        .refine(
          (data) =>
            !(data.firstTime === "yes" && !safeDate(data.previousVendingDate)),
          {
            message:
              locale === "bn"
                ? "প্রথম রিচার্জ হলে পূর্ববর্তী ভেন্ডিং তারিখ দিতে হবে"
                : "Previous vending date required for first recharge",
            path: ["previousVendingDate"],
          }
        )

        .refine(
          (data) =>
            !data.tariffCode.startsWith("LT-") || !!data.meterType,
          {
            message:
              locale === "bn"
                ? "LT ট্যারিফের জন্য মিটার টাইপ নির্বাচন করুন"
                : "Meter type is required for LT tariff",
            path: ["meterType"],
          }
        ),
    [locale]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  /* ---------------- INITIAL RESULT STATE ---------------- */
  const defaultMeterCharges = {
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

  const [result, setResult] = useState(defaultMeterCharges);

  const tariffIsLT = form.watch("tariffCode")?.startsWith("LT-");

  /* ---------------- SUBMIT LOGIC ---------------- */
  function onSubmit(values: z.infer<typeof formSchema>) {
    const prevDate = safeDate(values.previousVendingDate);

    const prevMonths = calcMonths(prevDate) - 1 > 0 ? calcMonths(prevDate) - 1 : 0;

    const cfg = TARIFFS[values.tariffCode];
    const demandPerKW = cfg.demandPerKW;

    const isLT = values.tariffCode.startsWith("LT-");

    const meterRentPerMonth =
      values.ownedBy === "bpdb"
        ? isLT
          ? values.meterType === "3p"
            ? 250
            : 40
          : 250
        : 0;

    const vat = (values.rechargeAmount * 5) / 105;

    const demandCharge =
      values.firstTime === "yes"
        ? values.sanctionLoad * demandPerKW
        : 0;

    const meterRent =
      values.firstTime === "yes" && values.ownedBy === "bpdb"
        ? meterRentPerMonth
        : 0;

    const prevDemand =
      prevMonths > 0
        ? prevMonths * values.sanctionLoad * demandPerKW
        : 0;

    const prevMeter =
      prevMonths > 0 && values.ownedBy === "bpdb"
        ? prevMonths * meterRentPerMonth
        : 0;

    const previousTotal = prevDemand + prevMeter;

    const totalCharge =
      vat + demandCharge + meterRent + previousTotal;

    const rebate =
      (0.5 / 100.5) *
      (values.rechargeAmount - vat - (meterRent + prevMeter));

    const totalEnergy =
      values.rechargeAmount - totalCharge + rebate;

    const formatted = {
      rechargeAmount: +values.rechargeAmount.toFixed(2),
      vat: +vat.toFixed(2),
      demandCharge: +demandCharge.toFixed(2),
      meterRent: +meterRent.toFixed(2),
      totalCharge: +totalCharge.toFixed(2),
      rebate: +rebate.toFixed(2),
      totalEnergy: +totalEnergy.toFixed(2),
      previousMonthsDemandCharge: +prevDemand.toFixed(2),
      previousMonthsMeterCharge: +prevMeter.toFixed(2),
      previousMonthsCharges: +previousTotal.toFixed(2),
      previousVendingMonthsCount: prevMonths,
      ownedBy: values.ownedBy,
      firstTime: values.firstTime,
    };

    setResult(formatted);

    /* ---------------- TOAST (old format, exact) ---------------- */
    toast({
      title: t.energyCalculator.resultTitle,
      description: (
        <div className="text-md rounded-sm bg-toast-success p-2 text-white">
          <div className="space-y-1">
            <div>
              {t.energyCalculator.rechargeAmountLabel}: {formatted.rechargeAmount}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.demandCharge}: {formatted.demandCharge}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.meterRent}: {formatted.meterRent}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.previousMonthsDemandCharges} (
              {formatted.previousVendingMonthsCount} {t.common.month}
              ): {formatted.previousMonthsDemandCharge} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.previousMonthsMeterCharges} (
              {formatted.previousVendingMonthsCount} {t.common.month}
              ): {formatted.previousMonthsMeterCharge} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.vat}: {formatted.vat} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.rebate}: -{formatted.rebate}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.totalCharge}: {formatted.totalCharge}{" "}
              {t.common.currency}
            </div>

            <div className="font-semibold">
              {t.energyCalculator.totalEnergyAmount}: {formatted.totalEnergy}{" "}
              {t.common.currency}
            </div>
          </div>
        </div>
      ),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- RESET ---------------- */
  function onReset() {
    form.reset();
    setKey((k) => k + 1);
    setResult(defaultMeterCharges);
    setFirstTime("no");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- RENDER ---------------- */
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        key={key}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">{t.energyCalculator.title}</h1>

        {/* ---------------- SUMMARY RIBBON ---------------- */}
        <div
          className={`rounded-sm p-2 text-base ${
            result.totalEnergy === 0
              ? "bg-gray-100"
              : "animate-fade bg-toast-success text-white animate-delay-300 animate-once"
          }`}
        >
          <div className="space-y-1">
            <div>
              {t.energyCalculator.rechargeAmountLabel}: {result.rechargeAmount}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.demandCharge}: {result.demandCharge}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.meterRent}: {result.meterRent}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.previousMonthsDemandCharges} (
              {result.previousVendingMonthsCount} {t.common.month}
              ): {result.previousMonthsDemandCharge} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.previousMonthsMeterCharges} (
              {result.previousVendingMonthsCount} {t.common.month}
              ): {result.previousMonthsMeterCharge} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.vat}: {result.vat} {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.rebate}: -{result.rebate}{" "}
              {t.common.currency}
            </div>

            <div>
              {t.energyCalculator.totalCharge}: {result.totalCharge}{" "}
              {t.common.currency}
            </div>

            <div className="font-semibold">
              {t.energyCalculator.totalEnergyAmount}: {result.totalEnergy}{" "}
              {t.common.currency}
            </div>
          </div>
        </div>

        {/* ---------------- INPUTS ---------------- */}
        <div className="text-lg space-y-4">
          {/* rechargeAmount */}
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
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  {t.energyCalculator.rechargeAmountDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* sanctionLoad */}
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
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  {t.energyCalculator.sanctionLoadDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* firstTime */}
          <FormField
            control={form.control}
            name="firstTime"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t.energyCalculator.firstTimeLabel}</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setFirstTime(val);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="yes" />
                      <FormLabel className="font-normal">
                        {t.common.yes}
                      </FormLabel>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="no" />
                      <FormLabel className="font-normal">
                        {t.common.no}
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  {t.energyCalculator.firstTimeDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* previousVendingDate */}
          {firstTime === "yes" && (
            <FormField
              control={form.control}
              name="previousVendingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t.energyCalculator.previousVendingLabel}
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t.energyCalculator.previousVendingDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* ownedBy */}
          <FormField
            control={form.control}
            name="ownedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.meterOwnerLabel}</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          t.energyCalculator.meterSelectPlaceholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="customer">
                      {t.common.customer}
                    </SelectItem>
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

          {/* tariffCode */}
          <FormField
            control={form.control}
            name="tariffCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.energyCalculator.tariffLabel}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tariff" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {Object.entries(TARIFFS).map(([code, cfg]) => (
                      <SelectItem key={code} value={code}>
                        {code} — {cfg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t.energyCalculator.tariffDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* meterType (LT only) */}
          {tariffIsLT && (
            <FormField
              control={form.control}
              name="meterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {locale === "bn" ? "মিটার টাইপ" : "Meter Type"}
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            locale === "bn"
                              ? "মিটার টাইপ নির্বাচন করুন"
                              : "Select meter type"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1p">
                        {locale === "bn" ? "সিঙ্গেল ফেজ" : "Single phase"}
                      </SelectItem>
                      <SelectItem value="3p">
                        {locale === "bn" ? "থ্রি ফেজ" : "Three phase"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* ---------------- BUTTONS ---------------- */}
        <div className="space-x-4">
          <Button className="bg-green" type="submit">
            {t.common.submit}
          </Button>

          <Button
            type="reset"
            className="bg-gray-200 text-black"
            onClick={onReset}
          >
            {t.common.reset}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EnergyCalculatorForm;
