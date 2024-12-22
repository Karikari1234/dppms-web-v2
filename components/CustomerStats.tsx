"use client";

import CustomerChart from "./CustomerChart";

const CustomerStats = () => {
  return (
    <div className="space-y-4 text-base  md:space-y-10">
      <h1 className="heading-text mb-5 !text-left !text-4xl">
        Prepaid Metering BPDB at a glance
      </h1>
      <p className="text-gray-700">
        The Bangladesh Power Development Board (BPDB) has achieved a significant
        milestone in its prepaid meter installation drive, with the total number
        of customers now exceeding 26 lakh (2.6 million+).
      </p>
      <p className="text-gray-700">
        The month-wise data for new prepaid meter customers in 2022-24 is as
        follows:
      </p>
      <div className="h-96">
        <CustomerChart></CustomerChart>
      </div>
      <p className="text-gray-700">
        As of October 2024, BPDB has installed a total of more than 28 lakh prepaid
        meters, which represents a significant increase from the previous year.
        In the past 12 months, BPDB has added over 7.8 lakh new prepaid meter
        customers.
      </p>
    </div>
  );
};

export default CustomerStats;
