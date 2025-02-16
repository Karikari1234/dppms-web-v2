// interface FAQAccordionData {
//   id: number;
//   question: string;
//   answer: string;
// }

// export const faqAccordionData: Array<FAQAccordionData> = [
//   {
//     id: 1,
//     question: "What is the VAT and demand charge on prepaid meter recharge?",
//     answer:
//       "The VAT is 5% on the energy recharged and demand charge is 42 taka on per kWh sanction load. It is to be noted that, the demand charge is deducted once a month.",
//   },
//   {
//     id: 2,
//     question: "What is sanction load?",
//     answer:
//       "Sanction load is the maximum electric power that can be used by the customer.",
//   },
// ];

interface FAQAccordionData {
  id: number;
  question: {
    en: string;
    bn: string;
  };
  answer: {
    en: string;
    bn: string;
  };
}

export const faqAccordionData: Array<FAQAccordionData> = [
  {
    id: 1,
    question: {
      en: "What is the VAT and demand charge on prepaid meter recharge?",
      bn: "প্রিপেইড মিটার রিচার্জে ভ্যাট এবং ডিমান্ড চার্জ কী?",
    },
    answer: {
      en: "The VAT is 5% on the energy recharged and demand charge is 42 taka on per kWh sanction load for residential consumers only. It is to be noted that, the demand charge is deducted once a month.",
      bn: "রিচার্জ করা এনার্জির উপর ভ্যাট ৫% এবং আবাসিক গ্রাহকদের জন্য প্রতি কিলোওয়াট অনুমোদিত লোডের উপর ডিমান্ড চার্জ ৪২ টাকা। উল্লেখ্য, ডিমান্ড চার্জ মাসে একবার কেটে নেওয়া হয়।",
    },
  },
  {
    id: 2,
    question: {
      en: "What is sanction load?",
      bn: "অনুমোদিত লোড কী?",
    },
    answer: {
      en: "Sanction load is the maximum electric power that can be used by the customer.",
      bn: "অনুমোদিত লোড হলো গ্রাহকের ব্যবহারযোগ্য সর্বাধিক বিদ্যুৎ শক্তি।",
    },
  },
];
