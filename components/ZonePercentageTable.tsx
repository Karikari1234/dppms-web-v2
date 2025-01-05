import { Order } from "@/lib/responseObject/orderObjectArray";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

interface ZoneData {
  id: number;
  name: string;
  totalCustomerNumber: string;
}

const ZonePercentageTable = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  const zoneData: ZoneData[] = [
    {
      id: 1,
      name: "Chottogram",
      totalCustomerNumber: "11,03,169",
    },
    {
      id: 2,
      name: "Cumilla",
      totalCustomerNumber: "5,92,441",
    },
    {
      id: 3,
      name: "Mymensingh",
      totalCustomerNumber: "6,41,949",
    },
    {
      id: 4,
      name: "Sylhet",
      totalCustomerNumber: "3,59,856",
    },
  ];
  return (
    <>
      <p className="font-bold ">
        {translation("zoneWiseStats.title")}
      </p>
      <div className="md:max-w-5/6 md:mx-auto">
        <Table className="">
          <TableCaption>{translation("zoneWiseStats.tableCaption")}</TableCaption>
          <TableHeader className="">
            <TableRow className="bg-gray-100">
              <TableHead>{translation("zoneWiseStats.tableHead1")}</TableHead>
              <TableHead>{translation("zoneWiseStats.tableHead2")}</TableHead>
              <TableHead className="text-center">
              {translation("zoneWiseStats.tableHead3")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoneData.map((zone: ZoneData) => (
              <TableRow key={zone.id}>
                <TableCell>{zone.id}</TableCell>
                <TableCell>{zone.name}</TableCell>
                <TableCell className="text-center">
                  {zone.totalCustomerNumber}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell className="font-bold">{translation("zoneWiseStats.total")}</TableCell>
              <TableCell className="text-center font-bold">{translation("zoneWiseStats.count")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ZonePercentageTable;
