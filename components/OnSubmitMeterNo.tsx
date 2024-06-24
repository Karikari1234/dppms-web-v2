"use server";

import { fetchCustomerData, fetchLastThreeTokens } from "@/lib/fetchData";

export default async function mOnSubmit(values: any) {
  //setIsDisabled(true);
  //call api and route to new page with result.
  //setMeterNo(values.meterNo);
  //console.log(meterNo);
  //setMeterNo(values.meterNo);
  //setMeterNo(values.meterNo);
  //console.log(meterNo);
  try {
    let orderData: any = await fetchLastThreeTokens(values.meterNo);
    const customerData: any = await fetchCustomerData(values.meterNo);
    return { mOrderData: orderData, mCustomerData: customerData };
  } catch (error) {
    console.log(error);
  }
}
