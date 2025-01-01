interface ChargeDetail {
  chargeDetails: string;
  calculation: string;
  amount: number;
}

interface ScenarioData {
  description: string;
  charges: ChargeDetail[];
}

// export const scenariosData: ScenarioData[] = [
//   // Scenario 1
//   {
//     description:
//       "When this consumer does a vending of 1000 taka for the 1st time in a month , then below charges will be applied. In this case, total 832.92 BDT energy amount will be inserted in meter.",
//     charges: [
//       {
//         chargeDetails: "Demand Charge",
//         calculation: "1 month x (2 Kwh x 42.00 BDT)",
//         amount: 84.0,
//       },
//       {
//         chargeDetails: "Meter Rent",
//         calculation: "1 month x 40.00 BDT",
//         amount: 40.0,
//       },
//       {
//         chargeDetails: "Vat (5%)",
//         calculation: "1000 x (5 / 105)",
//         amount: 47.62,
//       },
//       {
//         chargeDetails: "Rebate (0.5%)",
//         calculation: "0.5/100.5 x (1000 - 47.62 - 40.00)",
//         amount: -4.54,
//       },

//       {
//         chargeDetails: "Energy Amount",
//         calculation: "",
//         amount: 832.92,
//       },
//     ],
//   },
//   // Scenario 2
//   {
//     description:
//       "When this consumer does a vending of 1000 taka for the 2nd time in a month , then below charges will be applied. In this case, total 957.12 BDT energy amount will be inserted in meter.",
//     charges: [
//       {
//         chargeDetails: "Demand Charge",
//         calculation: "0 month x (2 Kwh x 42.00 BDT)",
//         amount: 0.0,
//       },
//       {
//         chargeDetails: "Meter Rent",
//         calculation: "0 month x 40.00 BDT",
//         amount: 0.0,
//       },
//       {
//         chargeDetails: "Vat (5%)",
//         calculation: "1000 x (5 / 105)",
//         amount: 47.62,
//       },
//       {
//         chargeDetails: "Rebate (0.5%)",
//         calculation: "0.5/100.5 x (1000 - 47.62 - 0.00)",
//         amount: -4.74,
//       },

//       {
//         chargeDetails: "Energy Amount",
//         calculation: "",
//         amount: 957.12,
//       },
//     ],
//   },
//   // Scenario 3
//   {
//     description:
//       "For example, if any  consumer’s last vending date was: 25th June then the consumer comes to the vending station at: 5th September  and wants to vend 1000 taka, then below charges will be applied. In this case, fixed charges of 3 months(July, August and September) will be deducted. Total 584.52 BDT energy amount will be inserted in meter.",
//     charges: [
//       {
//         chargeDetails: "Demand Charge",
//         calculation: "3 month x (2 Kwh x 42.00 BDT)",
//         amount: 252.0,
//       },
//       {
//         chargeDetails: "Meter Rent",
//         calculation: "3 month x 40.00 BDT",
//         amount: 120.0,
//       },
//       {
//         chargeDetails: "Vat (5%)",
//         calculation: "1000 x (5 / 105)",
//         amount: 47.62,
//       },
//       {
//         chargeDetails: "Rebate (0.5%)",
//         calculation: "0.5/100.5 x (1000 - 47.62 - 120.00)",
//         amount: -4.14,
//       },
//       {
//         chargeDetails: "Energy Amount",
//         calculation: "",
//         amount: 584.52,
//       },
//     ],
//   },
// ];


export const scenariosData = {
  en: [
    // Scenario 1
    {
      scenario: "1",
      description:
        "When this consumer does a vending of 1000 taka for the 1st time in a month, then below charges will be applied. In this case, total 832.92 BDT energy amount will be inserted in meter.",
      charges: [
        {
          chargeDetails: "Demand Charge",
          calculation: "1 month x (2 Kwh x 42.00 BDT)",
          amount: 84.0,
        },
        {
          chargeDetails: "Meter Rent",
          calculation: "1 month x 40.00 BDT",
          amount: 40.0,
        },
        {
          chargeDetails: "Vat (5%)",
          calculation: "1000 x (5 / 105)",
          amount: 47.62,
        },
        {
          chargeDetails: "Rebate (0.5%)",
          calculation: "0.5/100.5 x (1000 - 47.62 - 40.00)",
          amount: -4.54,
        },
        {
          chargeDetails: "Energy Amount",
          calculation: "",
          amount: 832.92,
        },
      ],
    },
    // Scenario 2
    {
      scenario: "2",
      description:
        "When this consumer does a vending of 1000 taka for the 2nd time in a month, then below charges will be applied. In this case, total 957.12 BDT energy amount will be inserted in meter.",
      charges: [
        {
          chargeDetails: "Demand Charge",
          calculation: "0 month x (2 Kwh x 42.00 BDT)",
          amount: 0.0,
        },
        {
          chargeDetails: "Meter Rent",
          calculation: "0 month x 40.00 BDT",
          amount: 0.0,
        },
        {
          chargeDetails: "Vat (5%)",
          calculation: "1000 x (5 / 105)",
          amount: 47.62,
        },
        {
          chargeDetails: "Rebate (0.5%)",
          calculation: "0.5/100.5 x (1000 - 47.62 - 0.00)",
          amount: -4.74,
        },
        {
          chargeDetails: "Energy Amount",
          calculation: "",
          amount: 957.12,
        },
      ],
    },
    // Scenario 3
    {
      scenario: "3",
      description:
        "For example, if any consumer’s last vending date was: 25th June then the consumer comes to the vending station at: 5th September and wants to vend 1000 taka, then below charges will be applied. In this case, fixed charges of 3 months (July, August, and September) will be deducted. Total 584.52 BDT energy amount will be inserted in meter.",
      charges: [
        {
          chargeDetails: "Demand Charge",
          calculation: "3 month x (2 Kwh x 42.00 BDT)",
          amount: 252.0,
        },
        {
          chargeDetails: "Meter Rent",
          calculation: "3 month x 40.00 BDT",
          amount: 120.0,
        },
        {
          chargeDetails: "Vat (5%)",
          calculation: "1000 x (5 / 105)",
          amount: 47.62,
        },
        {
          chargeDetails: "Rebate (0.5%)",
          calculation: "0.5/100.5 x (1000 - 47.62 - 120.00)",
          amount: -4.14,
        },
        {
          chargeDetails: "Energy Amount",
          calculation: "",
          amount: 584.52,
        },
      ],
    },
  ],
  bn: [
    // Scenario 1
    {
      scenario: "১",
      description:
        "যখন এই গ্রাহক মাসে প্রথমবারের মতো ১০০০ টাকা ভেন্ডিং করেন, তখন নিচের চার্জ প্রযোজ্য হবে। এই ক্ষেত্রে, মিটারে মোট ৮৩২.৯২ টাকা এনার্জি পরিমাণ যোগ হবে।",
      charges: [
        {
          chargeDetails: "ডিমান্ড চার্জ",
          calculation: "১ মাস x (২ কিলোওয়াট x ৪২.০০ টাকা)",
          amount: "৮৪.০",
        },
        {
          chargeDetails: "মিটার ভাড়া",
          calculation: "১ মাস x ৪০.০০ টাকা",
          amount: "৪০.০",
        },
        {
          chargeDetails: "ভ্যাট (৫%)",
          calculation: "১০০০ x (৫ / ১০৫)",
          amount: "৪৭.৬২",
        },
        {
          chargeDetails: "রেয়াত (০.৫%)",
          calculation: "০.৫/১০০.৫ x (১০০০ - ৪৭.৬২ - ৪০.০০)",
          amount: "-৪.৫৪",
        },
        {
          chargeDetails: "এনার্জি পরিমাণ",
          calculation: "",
          amount: "৮৩২.৯২",
        },
      ],
    },
    // Scenario 2
    {
      scenario: "২",
      description:
        "যখন এই গ্রাহক মাসে দ্বিতীয়বারের মতো ১০০০ টাকা ভেন্ডিং করেন, তখন নিচের চার্জ প্রযোজ্য হবে। এই ক্ষেত্রে, মিটারে মোট ৯৫৭.১২ টাকা এনার্জি পরিমাণ যোগ হবে।",
      charges: [
        {
          chargeDetails: "ডিমান্ড চার্জ",
          calculation: "০ মাস x (২ কিলোওয়াট x ৪২.০০ টাকা)",
          amount: "০.০",
        },
        {
          chargeDetails: "মিটার ভাড়া",
          calculation: "০ মাস x ৪০.০০ টাকা",
          amount: "০.০",
        },
        {
          chargeDetails: "ভ্যাট (৫%)",
          calculation: "১০০০ x (৫ / ১০৫)",
          amount: "৪৭.৬২",
        },
        {
          chargeDetails: "রেয়াত (০.৫%)",
          calculation: "০.৫/১০০.৫ x (১০০০ - ৪৭.৬২ - ০.০০)",
          amount: "-৪.৭৪",
        },
        {
          chargeDetails: "এনার্জি পরিমাণ",
          calculation: "",
          amount: "৯৫৭.১২",
        },
      ],
    },
    // Scenario 3
    {
      scenario: "৩",
      description:
        "উদাহরণস্বরূপ, যদি কোনো গ্রাহকের শেষ ভেন্ডিং তারিখ ছিল: ২৫শে জুন, এবং গ্রাহক ৫ই সেপ্টেম্বর ভেন্ডিং স্টেশনে এসে ১০০০ টাকা রিচার্জ করতে চান, তাহলে নিচের চার্জ প্রযোজ্য হবে। এই ক্ষেত্রে, ৩ মাসের (জুলাই, আগস্ট এবং সেপ্টেম্বর) ফিক্সড চার্জ কেটে নেওয়া হবে। মিটারে মোট ৫৮৪.৫২ টাকা এনার্জি পরিমাণ যোগ হবে।",
      charges: [
        {
          chargeDetails: "ডিমান্ড চার্জ",
          calculation: "৩ মাস x (২ কিলোওয়াট x ৪২.০০ টাকা)",
          amount: "২৫২.০",
        },
        {
          chargeDetails: "মিটার ভাড়া",
          calculation: "৩ মাস x ৪০.০০ টাকা",
          amount: "১২০.০",
        },
        {
          chargeDetails: "ভ্যাট (৫%)",
          calculation: "১০০০ x (৫ / ১০৫)",
          amount: "৪৭.৬২",
        },
        {
          chargeDetails: "রেয়াত (০.৫%)",
          calculation: "০.৫/১০০.৫ x (১০০০ - ৪৭.৬২ - ১২০.০০)",
          amount: "-৪.১৪",
        },
        {
          chargeDetails: "এনার্জি পরিমাণ",
          calculation: "",
          amount: "৫৮৪.৫২",
        },
      ],
    },
  ],
};