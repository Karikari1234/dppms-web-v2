"use client";
import {
  Order,
  TariffFee,
  Tokens,
} from "@/lib/responseObject/orderObjectArray";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useRouter } from "next/navigation";
import { parseISO, subMonths, format } from "date-fns";

interface Props {
  tokens: any;
  customer: any;
}

// Helper function to calculate relevant months for meter rent
const calculateMeterRentMonths = (date: string, chargeAmount: number) => {
  const meterRentPerMonth = parseInt(
    process.env.NEXT_PUBLIC_METER_RENT || "40",
  );
  const orderDate = parseISO(date);
  const months = Math.floor(chargeAmount / meterRentPerMonth);

  // Generate the list of relevant months
  const monthsList: string[] = [];
  for (let i = 0; i < months; i++) {
    const relevantDate = subMonths(orderDate, i);
    monthsList.push(format(relevantDate, "MMM''yy"));
  }
  
  if (monthsList.length == 0) return "No Charges"
  else return monthsList.reverse().join(", ");
};

// Helper function to calculate relevant months for meter rent
const calculateDemandChargesMonths = (date: string, chargeAmount: number, snLoad: number) => {
  const demandChargesPerUnit = parseInt(
    process.env.NEXT_PUBLIC_DEMAND_CHARGE || "42",
  );
  const demandChargesPerMonth = demandChargesPerUnit * snLoad;
  const orderDate = parseISO(date);
  const months = Math.floor(chargeAmount / demandChargesPerMonth);

  // Generate the list of relevant months
  const monthsList: string[] = [];
  for (let i = 0; i < months; i++) {
    const relevantDate = subMonths(orderDate, i);
    monthsList.push(format(relevantDate, "MMM''yy"));
  }
  
  if (monthsList.length == 0) return "No Charges"
  else return monthsList.reverse().join(", ");
};

function formatToken(dataString: string) {
  // Split the string by commas using the split() method
  const formattedData = dataString.split(",");

  // Map over the split array and create an array with elements wrapped in <br> tags
  const formattedDataArray = formattedData.map((item) => `<div>${item}</div>`);

  // Join the array of elements with <br> tags back into a string
  return formattedDataArray.join("");
}

const get_item_name = (a: any, b: any) =>
  a["itemName"]["_text"] > b["itemName"]["_text"] ? 1 : -1;

const TokenInfoTable = (props: Props) => {
  try {
    const { tokens } = props;
    const { customer } = props;
    //console.log(props);
    let tokenInfo: Array<Order> = tokens.orders.order;
    let customerSnLoad = customer.result.sanctionLoad._text;
    //console.log(tokenInfo);

    tokenInfo.map((token) => token.tariffFees.tariffFee?.sort(get_item_name));

    return (
      <>
        <div className="md:max-w-5/6 md:mx-auto">
          <Table className="border-slate-400 border-collapse border">
            <TableCaption>Last 3 Recharge Token summary.</TableCaption>
            <TableHeader className="">
              <TableRow className="bg-gray-100">
                <TableHead className="border-slate-300 border">Date</TableHead>
                <TableHead className="border-slate-300 border">
                  Token no.
                </TableHead>
                <TableHead className="border-slate-300 border">
                  Sequence
                </TableHead>
                <TableHead className="border-slate-300 border">
                  Gross Recharge Amount
                </TableHead>
                {tokenInfo.length > 0 ? (
                  tokenInfo[0].tariffFees.tariffFee?.map(
                    (tariff: TariffFee) => (
                      <TableHead
                        className="border-slate-300 border"
                        key={tariff.itemName._text}
                      >
                        {tariff.itemName._text}
                      </TableHead>
                    ),
                  )
                ) : (
                  <></>
                )}
                <TableHead className="border-slate-300 border">
                  Energy Cost
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokenInfo.map((token: any) => (
                <TableRow key={`${token.orderNo._text}`}>
                  <TableCell className="border-slate-300 border">
                    {token.date._text}
                  </TableCell>
                  <TableCell
                    className="border-slate-300 whitespace-nowrap border"
                    dangerouslySetInnerHTML={{
                      __html: formatToken(token.tokens._text),
                    }}
                  ></TableCell>
                  <TableCell className="border-slate-300 border">
                    {token.sequence._text}
                  </TableCell>
                  <TableCell className="border-slate-300 border">
                    {token.grossAmount._text}
                  </TableCell>
                  {token.tariffFees.tariffFee?.map((tariff: TariffFee) => (
                    <TableCell
                      className="border-slate-300 border"
                      key={`${tariff.chargeDes._text} ${tariff.chargeAmount._text}`}
                    >
                      {tariff.chargeAmount._text}
                      {tariff.itemName._text === "Meter Rent 1P"
                        ? ` (${calculateMeterRentMonths(
                            token.date._text,
                            parseFloat(tariff.chargeAmount._text),
                          )})` // Add Meter Rent months
                        : ""}
                      {tariff.itemName._text === "Demand Charge"
                        ? ` (${calculateDemandChargesMonths(
                            token.date._text,
                            parseFloat(tariff.chargeAmount._text),
                            parseFloat(customerSnLoad)
                          )})` // Add Demand Charge months
                        : ""}
                    </TableCell>
                  ))}
                  <TableCell className="border-slate-300 border">
                    {token.energyCost._text}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  } catch (error) {
    return <div>No tokens found, please contact SND.</div>;
  }
};

export default TokenInfoTable;
