"use server";

import { fetchCustomerData, fetchLastThreeTokens, fetchKfwCustomerData, fetchKfwLastThreeTokens } from "@/lib/fetchData";

export default async function mOnSubmit(values: any) {
  //setIsDisabled(true);
  //call api and route to new page with result.
  //setMeterNo(values.meterNo);
  //console.log(meterNo);
  //setMeterNo(values.meterNo);
  //setMeterNo(values.meterNo);
  //console.log(meterNo);
  try {
    const meterNo = values.meterNo.toString();
    let orderData: any = null;
    let customerData: any = null;
    console.log("meterNo", meterNo);
    if(meterNo.startsWith("0121") || meterNo.startsWith("0123")) {
      orderData = await fetchKfwLastThreeTokens(values.meterNo);
      customerData = await fetchKfwCustomerData(values.meterNo);
      // console.log("orderData", orderData);
      // console.log("customerData", customerData);
    } else {
      orderData = await fetchLastThreeTokens(values.meterNo);
      customerData = await fetchCustomerData(values.meterNo);
    }

    
    
    return { mOrderData: orderData, mCustomerData: customerData };
  } catch (error) {
    console.log(error);
  }
}
