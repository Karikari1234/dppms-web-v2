import { customerData } from "@/lib/customer-data";
import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getTranslation } from "@/lib/i18n/getTranslation";
import { Locale } from "@/i18n";

const CustomerChart = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={customerData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="newCustomerNo"
          stroke="#00513D"
          activeDot={{ r: 8 }}
          name={translation("customerCharts.title")}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;
