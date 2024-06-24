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

interface Props {
  customer: CustomerInformation;
}
const CustomerInfoTable = (props: Props) => {
  const { customer } = props;
  const customerInfo = customer.result;
  //const { meterNo } = useMeterNoStore();
  return (
    <>
      <div className="md:mx-auto md:max-w-xl">
        <Table className="">
          <TableCaption>Customer Information Summary.</TableCaption>
          <TableHeader className="">
            <TableRow className="bg-gray-100">
              <TableHead className="w-1/3 text-right">Metadata</TableHead>
              <TableHead className="">Information</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-right">Customer Name</TableCell>
              <TableCell>{customerInfo.customerName._text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">Customer Account No.</TableCell>
              <TableCell>{customerInfo.customerAccountNo._text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">Customer Meter No.</TableCell>
              <TableCell>{customerInfo.meterNumber._text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">Customer Address</TableCell>
              <TableCell>{customerInfo.customerAddress._text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">Last Recharge Amount</TableCell>
              <TableCell>{`${customerInfo.lastRechargeAmount._text} BDT`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">Last Recharge Time</TableCell>
              <TableCell>{customerInfo.lastRechargeTime._text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right">SND Division</TableCell>
              <TableCell>{customerInfo.sndDivision._text}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CustomerInfoTable;
