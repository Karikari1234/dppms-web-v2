interface ChargeDetail {
  chargeDetails: string;
  calculation: string;
  amount: number;
}

interface ScenarioData {
  description: string;
  charges: ChargeDetail[];
}

export const scenariosData: ScenarioData[] = [
  // Scenario 1
  {
    description:
      "When this consumer does a vending of 1000 taka for the 1st time in a month , then below charges will be applied. In this case, total 851.41 BDT energy amount will be inserted in meter.",
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
        calculation: ".5/100.5 x (1000 - 47.62 - 40.00)",
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
    description:
      "When this consumer does a vending of 1000 taka for the 2nd time in a month , then below charges will be applied. In this case, total 961.81 BDT energy amount will be inserted in meter.",
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
        calculation: ".5/100.5 x (1000 - 47.62 - 0.00)",
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
    description:
      "For example, if any  consumer’s last vending date was: 25th June then the consumer comes to the vending station at: 5th September  and wants to vend 1000 taka, then below charges will be applied. In this case, fixed charges of 3 months(July, August and September) will be deducted. Total 630.62 BDT energy amount will be inserted in meter.",
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
        calculation: ".5/100.5 x (1000 - 47.62 - 120.00)",
        amount: -4.14,
      },
      {
        chargeDetails: "Energy Amount",
        calculation: "",
        amount: 584.52,
      },
    ],
  },
];
