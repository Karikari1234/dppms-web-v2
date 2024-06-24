"use client";

import { useTokenResStore } from "@/lib/global/store";
import CustomerInfoTable from "./CustomerInformationTable";
import TokenInfoTable from "./TokenInformationTable";
import { useEffect, useState } from "react";

const TokenPageWrapperComponent = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const { responseBody } = useTokenResStore();
  //console.log(responseBody);
  useEffect(() => {
    setOrderData(responseBody?.mOrderData);
    setCustomerData(responseBody?.mCustomerData);
  }, []);

  return orderData?.result !== undefined &&
    customerData?.result !== undefined ? (
    <div className="space-y-8">
      <h2 className="heading-text mb-4 !text-center !text-2xl md:mb-8">
        Customer Information
      </h2>
      <CustomerInfoTable customer={customerData} />
      <h2 className="heading-text mb-4 !text-center !text-2xl md:mb-8">
        Last 3 Recharge Token Information
      </h2>
      <TokenInfoTable tokens={orderData.result} />

      {/* <div>
        <pre>{`${JSON.stringify(orderData.result.orders, null, 2)}`}</pre>
      </div>
      <div>
        <pre>{`${JSON.stringify(customerData.result, null, 2)}`}</pre>
      </div> */}
    </div>
  ) : orderData === null && customerData === null ? (
    <div className="mb-96">Loading...</div>
  ) : orderData?.res?.statusCode != 500 ? (
    <div className="mb-96">No results found.</div>
  ) : (
    <div className="mb-96">An server error occured. Please try later.</div>
  );
};

export default TokenPageWrapperComponent;
