import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { meterShortCodes } from "@/lib/shortcode";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const ShortCodeTable = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  const listOfShortCode = meterShortCodes.map((item) => (
    <>
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.information[locale]} </TableCell>
        <TableCell>{item.hexing}</TableCell>
        <TableCell>{item.inhe1P}</TableCell>
        <TableCell>{item.inhe3P}</TableCell>
        <TableCell>{item.linyang}</TableCell>
        <TableCell>{item.eastern} </TableCell>
      </TableRow>
    </>
  ));
  return (
    <div className="">
      <Table className="">
        <TableCaption>{translation("meterShortCode.tableCaption")}</TableCaption>
        <TableHeader className="">
          <TableRow className="bg-gray-100">
            <TableHead className="">{translation("meterShortCode.serialNo")}</TableHead>
            <TableHead className="">{translation("meterShortCode.information")}</TableHead>
            <TableHead>{translation("meterShortCode.allMeters")}</TableHead>
            <TableHead>{translation("meterShortCode.legacyInhe1P")}</TableHead>
            <TableHead>{translation("meterShortCode.legacyInhe3P")}</TableHead>
            <TableHead>{translation("meterShortCode.legacyLinyang")}</TableHead>
            <TableHead>{translation("meterShortCode.legacyEastern")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{listOfShortCode}</TableBody>
      </Table>
    </div>
  );
};

export default ShortCodeTable;
