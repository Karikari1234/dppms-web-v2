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

import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const formSchema = z.object({
  rechargeAmount: z.number().min(200, {
    message: "Minimum 200 BDT needs to be recharged",
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
});

interface MeterCharges {
  vat: number;
  demandCharge: number;
  meterRent: number;
  totalCharge: number;
  rebate: number;
  totalEnergy: number;
  ownedBy?: string;
  firstTime?: string;
}

const defaultMeterCharges: MeterCharges = {
  vat: 0.0,
  demandCharge: 0.0,
  meterRent: 0.0,
  totalCharge: 0.0,
  rebate: 0.0,
  totalEnergy: 0.0,
  ownedBy: "",
  firstTime: "",
};

export async function EnergyCalculatorForm({ locale }: { locale: Locale }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  //const toast = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const vat: number = (values.rechargeAmount * 5) / 105;
    const demandCharge: number =
      values.firstTime == "yes" ? values.sanctionLoad * 42 : 0.0;
    const meterRent: number =
      values.ownedBy == "bpdb" && values.firstTime == "yes" ? 40.0 : 0.0;
    const totalCharge: number = vat + demandCharge + meterRent;
    const rebate: number =
      (.5 / 100.5) * (values.rechargeAmount - vat - meterRent);
    const totalEnergy: number = values.rechargeAmount - totalCharge + rebate;
    let result: MeterCharges = {
      ...defaultMeterCharges,
      vat: vat.toFixed(2) as unknown as number,
      demandCharge: demandCharge.toFixed(2) as unknown as number,
      meterRent: meterRent.toFixed(2) as unknown as number,
      totalCharge: totalCharge.toFixed(2) as unknown as number,
      rebate: rebate.toFixed(2) as unknown as number,
      totalEnergy: totalEnergy.toFixed(2) as unknown as number,
    };
    //console.log(res);
    toast({
      title: "Your Meter Charges: ",
      description: (
        <div className={`text-md rounded-sm bg-toast-success p-2 text-white`}>
          <div className="space-y-1">
            
            <div>
              Demand Charge (Sanction Load*42/kWh Monthly):{" "}
              {result.demandCharge} BDT
            </div>
            <div>Meter Rent 1P(40/Month): {result.meterRent} BDT</div>
            <div>VAT(5%): {result.vat} BDT</div>
            <div>Rebate(1%): -{result.rebate} BDT</div>
	    <div>Total Charges: {result.totalCharge} BDT</div>
            <div className="font-semibold">
              <span className="font-semibold">Total Energy Amount:</span>{" "}
              {result.totalEnergy} BDT
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        key={key}
      >
        <h1 className="text-3xl font-bold">Prepaid Meter Energy Calculator</h1>
        <div
          className={`rounded-sm ${
            result == defaultMeterCharges
              ? `bg-gray-100`
              : `animate-fade  bg-toast-success text-white animate-delay-300 animate-once`
          } p-2 text-base`}
        >
          <div className="space-y-1">
            <div>
              Demand Charge (Sanction Load*42/kWh Monthly):{" "}
              {result.demandCharge} BDT
            </div>
            <div>Meter Rent 1P(40/Month): {result.meterRent} BDT</div>
            <div>VAT(5%): {result.vat} BDT</div>
            <div>Rebate(0.5%): -{result.rebate} BDT</div>
	    <div>Total Charges: {result.totalCharge} BDT</div>
            <div className="font-semibold">
              <span className="font-semibold">Total Energy Amount:</span>{" "}
              {result.totalEnergy} BDT
            </div>
          </div>
        </div>
        <div className="text-lg">
          <FormField
            control={form.control}
            name="rechargeAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Recharge Amount (BDT)</FormLabel>
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
                  Provide Amount To Be Recharged.
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
                <FormLabel>Meter Sanction Load (in kWh)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2"
                    defaultValue={"2"}
                    {...form.register("sanctionLoad", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Provide Sanction Load Amount.</FormDescription>
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
                  Is it your first time meter recharge this month?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Recharging first time will deduct meter rent and demand
                  charges.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meter owner</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer or BPDB" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="bpdb">BPDB</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Meter is owned by BPDB or customer. If customer owns the
                  meter, then no meter rent will be charged monthly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-x-4">
          <Button className="bg-green" type="submit">
            Submit
          </Button>
          <Button
            type="reset"
            className="bg-gray-200 text-black hover:bg-gray-300"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
