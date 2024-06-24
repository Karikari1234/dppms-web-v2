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

interface Props {
  tokens: any;
}

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
    //console.log(props.tokens);
    let tokenInfo: Array<Order> = tokens.orders.order;
    //console.log(tokenInfo);

    tokenInfo.map((token) => token.tariffFees.tariffFee?.sort(get_item_name));

    return (
      <>
        <div className="md:max-w-5/6 md:mx-auto">
          <Table className="border-collapse border border-slate-400">
            <TableCaption>Last 3 Recharge Token summary.</TableCaption>
            <TableHeader className="">
              <TableRow className="bg-gray-100">
                <TableHead className="border border-slate-300">Date</TableHead>
                <TableHead className="border border-slate-300">Token no.</TableHead>
                <TableHead className="border border-slate-300">Sequence</TableHead>
                <TableHead className="border border-slate-300">Gross Recharge Amount</TableHead>
                {tokenInfo.length > 0 ? (
                  tokenInfo[0].tariffFees.tariffFee?.map(
                    (tariff: TariffFee) => (
                      <TableHead className="border border-slate-300" key={tariff.itemName._text}>
                        {tariff.itemName._text}
                      </TableHead>
                    ),
                  )
                ) : (
                  <></>
                )}
                <TableHead className="border border-slate-300">Energy Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokenInfo.map((token: any) => (
                <TableRow key={`${token.orderNo._text}`}>
                  <TableCell className="border border-slate-300">{token.date._text}</TableCell>
                  <TableCell className="border border-slate-300 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: formatToken(token.tokens._text) }}></TableCell>
                  <TableCell className="border border-slate-300">{token.sequence._text}</TableCell>
                  <TableCell className="border border-slate-300">{token.grossAmount._text}</TableCell>
                  {token.tariffFees.tariffFee?.map((tariff: TariffFee) => (
                    <TableCell
                    className="border border-slate-300"
                      key={`${tariff.chargeDes._text} ${tariff.chargeAmount._text}`}
                    >
                      {tariff.chargeAmount._text}
                    </TableCell>
                  ))}
                  <TableCell className="border border-slate-300">{token.energyCost._text}</TableCell>
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
