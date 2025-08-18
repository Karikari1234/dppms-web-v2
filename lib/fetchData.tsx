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

// const fetchKfwCustomerData = async (meterNo: string) => {
//   //console.log("I am CALLLLLLLLLLLLEDDD");
//   //   let data = qs.stringify(
//   //     `<xml meterNo= ${meterNo} userName="zubayer" userPass="m7PM/lj+MYKoUcaydxQQe6Ez6Qal5N5DQAArpAmFcgOn+TLK3tN+VA==" />`,
//   //   );
//   //let res: CustomerInformation;
//   // let data = qs.stringify({
//   //   reqXml: `<xml  meterNo="${meterNo}" userName="" userPass="" />`,
//   // });
//   const trimmedMeterNo = meterNo.toString().slice(1);
//   console.log("Using trimmed meterNo:", trimmedMeterNo);

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `${process.env.LIVE_KFW_API_URL}/AmiWeb/prepay/queryCustomerElecInfo.do`,
//     headers: {
//       "Content-Type": "application/xml",
//     },
//     data: `<xml  meterNo="${trimmedMeterNo}" userName="" userPass="" />`,
//   };

//   try {
//     const res = await axios.request(config);
//     console.log(res.data);
//     //if (res.status == 500) throw new Error("Internal Server Error");
//     return JSON.parse(
//       convert.xml2json(
//         res.data
//           .replace(/[\n\r]/g, "\\n")
//           .replace(/&/g, "&amp;")
//           .replace(/-/g, "&#45;"),
//         {
//           compact: true,
//           spaces: 4,
//         },
//       ),
//     ) as CustomerInformation;
//   } catch (error) {
//     console.log(error);
//   }

//   //return res;
// };

function sanitizeXml(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/^\uFEFF/, "").trim();     // remove UTF-8 BOM if present
  const firstLt = s.indexOf("<");
  const lastGt = s.lastIndexOf(">");
  if (firstLt === -1 || lastGt === -1 || lastGt <= firstLt) return "";
  return s.slice(firstLt, lastGt + 1);
}

/** Safe xml2json wrapper that returns null on failure + logs a preview */
function xmlToJsonSafe(xml: string): any | null {
  try {
    return JSON.parse(
      convert.xml2json(xml, {
        compact: true,
        spaces: 0,
        ignoreDeclaration: true,
        ignoreComment: true,
        trim: true,
      })
    );
  } catch (e) {
    console.error("XML parse failed. Head:", xml.slice(0, 200));
    return null;
  }
}

const fetchKfwCustomerData = async (meterNo: string) => {
  const trimmedMeterNo = meterNo.toString().slice(1);
  console.log("Using trimmed meterNo:", trimmedMeterNo);

  const xmlBody = `<xml meterNo="${trimmedMeterNo}" userName="" userPass="" />`;

  const res = await axios.post(
    `${process.env.LIVE_KFW_API_URL}/AmiWeb/prepay/queryCustomerElecInfo.do`,
    xmlBody,
    {
      headers: {
        // servers typically accept either of these; text/xml is safe
        "Content-Type": "text/xml; charset=UTF-8",
        "Accept": "text/xml,application/xml,text/plain,*/*",
      },
      responseType: "text",          // get raw text
      transformRequest: [(d) => d],  // don't let axios modify body
      validateStatus: () => true,    // handle errors ourselves
      timeout: 20000,
    }
  );

  const body = typeof res.data === "string" ? res.data : String(res.data ?? "");
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`KFW HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  // CRITICAL: do NOT replace & or - — that will break entities and tags.
  const cleaned = sanitizeXml(body);
  if (!cleaned) {
    throw new Error(`KFW returned non-XML or empty body for ${trimmedMeterNo}: ${body.slice(0, 200)}`);
  }

  console.log(cleaned);

  const json = xmlToJsonSafe(cleaned);
  if (!json) {
    throw new Error("Unable to parse KFW XML (see server logs for preview).");
  }

  // Map to your CustomerInformation shape here if needed
  return json as unknown as CustomerInformation;
};

// const fetchKfwLastThreeTokens = async (meterNo: string, customerNo?: string) => {
//   // try {
//   //   if (!customerNo) {
//   //     const res: any = await fetchKfwCustomerData(meterNo);
//   //     //if (res.status === 500) throw new Error("Internal Server Error");
//   //     customerNo = res.result.customerAccountNo._text;
//   //   }
//   // } catch (error) {
//   //   console.log(error);
//   // }

//   // let data = qs.stringify({
//   //   reqXml: `<xml  meterNo="${meterNo}" customerNo="" userName="" userPass="" />`,
//   // });

//   const trimmedMeterNo = meterNo.toString().slice(1);
//   console.log("Using trimmed meterNo:", trimmedMeterNo);

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `${process.env.LIVE_KFW_API_URL}/AmiWeb/prepay/queryLastSalesRecords.do`,
//     headers: {
//       "Content-Type": "application/xml",

//     },
//     data: `<xml  meterNo="${trimmedMeterNo}" userName="" userPass="" />`,
//   };

//   try {
//     const res = await axios.request(config);
//     console.log(res.data);
//     //if (res?.status === 500) throw new Error("Internal Server Error");
//     return JSON.parse(
//       convert.xml2json(
//         res.data
//           .replace(/[\n\r]/g, "\\n")
//           .replace(/&/g, "&amp;")
//           .replace(/-/g, "&#45;"),
//         {
//           compact: true,
//           spaces: 4,
//         },
//       ),
//     ) as OrderObjectArray;
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchKfwLastThreeTokens = async (
  meterNo: string,
  customerNo?: string
) => {
  // trim first digit as requested
  const trimmedMeterNo = meterNo.toString().slice(1);
  console.log("Using trimmed meterNo:", trimmedMeterNo);

  // include customerNo if you have it (optional)
  const xmlBody = `<xml meterNo="${trimmedMeterNo}" userName="" userPass="" />`;

  const res = await axios.post(
    `${process.env.LIVE_KFW_API_URL}/AmiWeb/prepay/queryLastSalesRecords.do`,
    xmlBody, // RAW XML body
    {
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
        "Accept": "text/xml,application/xml,text/plain,*/*",
      },
      responseType: "text",
      transformRequest: [(d) => d], // don't mutate body
      validateStatus: () => true,   // handle non-2xx manually
      timeout: 20000,
    }
  );

  const body = typeof res.data === "string" ? res.data : String(res.data ?? "");
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`KFW tokens HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  // IMPORTANT: no manual `.replace` for & or - (that corrupts valid XML)
  const cleaned = sanitizeXml(body);
  if (!cleaned) {
    throw new Error(
      `KFW tokens returned non-XML or empty body for ${trimmedMeterNo}: ${body.slice(0, 200)}`
    );
  }

  const json = xmlToJsonSafe(cleaned);
  if (!json) {
    throw new Error("Unable to parse KFW tokens XML (see server logs for preview).");
  }

  // Optionally map `json` to your OrderObjectArray here before returning
  return json as unknown as OrderObjectArray;
};

export { fetchCustomerData, fetchLastThreeTokens, fetchKfwCustomerData, fetchKfwLastThreeTokens };
