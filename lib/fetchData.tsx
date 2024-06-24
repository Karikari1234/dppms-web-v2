// Fetch two API endpoints for GET token and customer data;

import axios, { AxiosResponse } from "axios";
import { CustomerInformation } from "./responseObject/customerInformation";
import { OrderObjectArray } from "./responseObject/orderObjectArray";
var qs = require("qs");
var convert = require("xml-js");

const fetchCustomerData = async (meterNo: string) => {
  //console.log("I am CALLLLLLLLLLLLEDDD");
  //   let data = qs.stringify(
  //     `<xml meterNo= ${meterNo} userName="zubayer" userPass="m7PM/lj+MYKoUcaydxQQe6Ez6Qal5N5DQAArpAmFcgOn+TLK3tN+VA==" />`,
  //   );
  //let res: CustomerInformation;
  let data = qs.stringify({
    reqXml: `<xml  meterNo="${meterNo}" userName="CallCentre" userPass="7sysRNh59ie91wD6UTqUAlIQjeZbzEw9vETTVu/yd0O0iCdSTJ0V2g==" />`,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.LIVE_API_URL}/prepay/prepay/testCode/customIbcs!getCustomerInfo.do`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "userName=CallCentre",
    },
    data: data,
  };

  try {
    const res = await axios.request(config);
    console.log(res.data);
    //if (res.status == 500) throw new Error("Internal Server Error");
    return JSON.parse(
      convert.xml2json(
        res.data
          .replace(/[\n\r]/g, "\\n")
          .replace(/&/g, "&amp;")
          .replace(/-/g, "&#45;"),
        {
          compact: true,
          spaces: 4,
        },
      ),
    ) as CustomerInformation;
  } catch (error) {
    console.log(error);
  }

  //return res;
};

const fetchLastThreeTokens = async (meterNo: string, customerNo?: string) => {
  try {
    if (!customerNo) {
      const res: any = await fetchCustomerData(meterNo);
      //if (res.status === 500) throw new Error("Internal Server Error");
      customerNo = res.result.customerAccountNo._text;
    }
  } catch (error) {
    console.log(error);
  }

  let data = qs.stringify({
    reqXml: `<xml  meterNo="${meterNo}" customerNo="${customerNo}" userName="CallCentre" userPass="7sysRNh59ie91wD6UTqUAlIQjeZbzEw9vETTVu/yd0O0iCdSTJ0V2g==" />`,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.LIVE_API_URL}/prepay/prepay/testCode/customIbcs!callCenterPrepaidTokenAPI.do`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "userName=CallCentre; JSESSIONID=52C574BCC857F3EC71AD25FA02CFBDF2.tomcat7_a",
    },
    data: data,
  };

  try {
    const res = await axios.request(config);
    //console.log(res.data);
    //if (res?.status === 500) throw new Error("Internal Server Error");
    return JSON.parse(
      convert.xml2json(
        res.data
          .replace(/[\n\r]/g, "\\n")
          .replace(/&/g, "&amp;")
          .replace(/-/g, "&#45;"),
        {
          compact: true,
          spaces: 4,
        },
      ),
    ) as OrderObjectArray;
  } catch (error) {
    console.log(error);
  }
};

export { fetchCustomerData, fetchLastThreeTokens };
