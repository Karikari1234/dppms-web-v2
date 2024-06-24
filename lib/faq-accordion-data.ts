interface FAQAccordionData {
  id: number;
  question: string;
  answer: string;
}

export const faqAccordionData: Array<FAQAccordionData> = [
  {
    id: 1,
    question: "What is the VAT and demand charge on prepaid meter recharge?",
    answer:
      "The VAT is 5% on the energy recharged and demand charge is 42 taka on per kWh sanction load. It is to be noted that, the demand charge is deducted once a month.",
  },
  {
    id: 2,
    question: "What is sanction load?",
    answer:
      "Sanction load is the maximum electric power that can be used by the customer.",
  },
];
