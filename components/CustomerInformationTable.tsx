"use client";

import {
  CustomerInformation,
  Result,
} from "@/lib/responseObject/customerInformation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Locale } from "@/i18n"; // Assuming you have a `Locale` type
import { getTranslation } from "@/lib/i18n/getTranslation";

interface Props {
  customer: CustomerInformation;
  locale: Locale; // Add locale as a prop
}

const CustomerInfoTable = async (props: Props) => {
  const { customer, locale } = props;
  const translation = await getTranslation(locale); // Fetch translations dynamically
  const customerInfo = customer.result;

  return (
    <div className="md:mx-auto md:max-w-xl">
      <Table className="">
        <TableCaption>{translation("customerInfo.tableCaption")}</TableCaption>
        <TableHeader className="">
          <TableRow className="bg-gray-100">
            <TableHead className="w-1/3 text-right">
              {translation("customerInfo.metadata")}
            </TableHead>
            <TableHead className="">
              {translation("customerInfo.information")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.customerName")}
            </TableCell>
            <TableCell>{customerInfo.customerName._text}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.customerAccountNo")}
            </TableCell>
            <TableCell>{customerInfo.customerAccountNo._text}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.customerMeterNo")}
            </TableCell>
            <TableCell>{customerInfo.meterNumber._text}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.sanctionLoad")}
            </TableCell>
            <TableCell>{customerInfo.sanctionLoad._text} kW</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.customerAddress")}
            </TableCell>
            <TableCell>{customerInfo.customerAddress._text}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.lastRechargeAmount")}
            </TableCell>
            <TableCell>
              {`${customerInfo.lastRechargeAmount._text} BDT`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.lastRechargeTime")}
            </TableCell>
            <TableCell>{customerInfo.lastRechargeTime._text}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-right">
              {translation("customerInfo.sndDivision")}
            </TableCell>
            <TableCell>{customerInfo.sndDivision._text}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerInfoTable;
