"use client";
import { Order, TariffFee } from "@/lib/responseObject/orderObjectArray";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { parseISO, subMonths, format } from "date-fns";
import { Locale } from "@/i18n"; // Assuming you have a `Locale` type
import { getTranslation } from "@/lib/i18n/getTranslation";

interface Props {
  tokens: any;
  customer: any;
  locale: Locale; // Added locale prop
}

// Helper function to calculate relevant months for meter rent
const calculateTotalChargeMonths = (date: string, monthDifference: number) => {
  // const meterRentPerMonth = parseInt(
  //   process.env.NEXT_PUBLIC_METER_RENT || "40",
  // );
  const orderDate = parseISO(date);
  const months = monthDifference;

  // Generate the list of relevant months
  const monthsList: string[] = [];
  for (let i = 0; i < months; i++) {
    const relevantDate = subMonths(orderDate, i);
    monthsList.push(format(relevantDate, "MMM''yy"));
  }

  return monthsList.length === 0
    ? "No Charges"
    : monthsList.reverse().join(", ");
};

// Format tokens for rendering
function formatToken(dataString: string) {
  return dataString
    .split(",")
    .map((item) => `<div>${item}</div>`)
    .join("");
}

// Sorting helper
const get_item_name = (a: any, b: any) =>
  a["itemName"]["_text"] > b["itemName"]["_text"] ? 1 : -1;

const TokenInfoTable = async (props: Props) => {
  try {
    const { tokens, customer, locale } = props;
    const translation = await getTranslation(locale); // Get translations dynamically
    let tokenInfo: Array<Order> = tokens.orders.order;
    let customerSnLoad = customer.result.sanctionLoad._text;

    tokenInfo.map((token) => token.tariffFees.tariffFee?.sort(get_item_name));

    return (
      <>
        <div className="md:max-w-5/6 md:mx-auto">
          <Table className="border-slate-400 border-collapse border">
            <TableCaption>{translation("tokenInfo.tableCaption")}</TableCaption>
            <TableHeader className="">
              <TableRow className="bg-gray-100">
                <TableHead className="border-slate-300 items-center justify-center border font-bold">
                  {/* {translation("tokenInfo.date")} */}
                  Date
                </TableHead>
                <TableHead className="border-slate-300 items-center justify-center border font-bold">
                  {/* {translation("tokenInfo.tokenNumber")} */}
                  Token No.
                </TableHead>
                <TableHead className="border-slate-300 items-center justify-center border font-bold">
                  {/* {translation("tokenInfo.sequence")} */}
                  Sequence
                </TableHead>
                <TableHead className="border-slate-300 items-center justify-center border font-bold">
                  {/* {translation("tokenInfo.grossAmount")} */}
                  Gross Recharge Amount
                </TableHead>
                {tokenInfo.length > 0 ? (
                  tokenInfo[0].tariffFees.tariffFee?.map(
                    (tariff: TariffFee) => (
                      <TableHead
                        className="border-slate-300 items-center justify-center border font-bold"
                        key={tariff.itemName._text}
                      >
                        {tariff.itemName._text}
                      </TableHead>
                    ),
                  )
                ) : (
                  <></>
                )}
                <TableHead className="border-slate-300 items-center justify-center border font-bold">
                  {/* {translation("tokenInfo.energyCost")} */}
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
                    {token.sequence._text || "N/A"}
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
                        ? parseFloat(tariff.chargeAmount._text) > 0
                          ? ` (${calculateTotalChargeMonths(
                              token.date._text,
                              parseFloat(token.monthDifference._text),
                            )})`
                          : " (No Charges)"
                        : ""}
                      {tariff.itemName._text === "Demand Charge"
                        ? ` (${calculateTotalChargeMonths(
                            token.date._text,
                            parseFloat(token.monthDifference._text),
                          )})`
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
