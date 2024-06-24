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

interface ZoneData {
  id: number;
  name: string;
  totalCustomerNumber: string;
}

const ZonePercentageTable = () => {
  const zoneData: ZoneData[] = [
    {
      id: 1,
      name: "Chottogram",
      totalCustomerNumber: "7,81,767",
    },
    {
      id: 2,
      name: "Comilla",
      totalCustomerNumber: "2,92,608",
    },
    {
      id: 3,
      name: "Mymensingh",
      totalCustomerNumber: "4,94,891",
    },
    {
      id: 4,
      name: "Sylhet",
      totalCustomerNumber: "2,87,567",
    },
  ];
  return (
    <>
      <p className="font-bold ">
        Zone wise prepaid customer distribution BPDB:
      </p>
      <div className="md:max-w-5/6 md:mx-auto">
        <Table className="">
          <TableCaption>Zonal Prepaid Customer Distribution BPDB.</TableCaption>
          <TableHeader className="">
            <TableRow className="bg-gray-100">
              <TableHead>Sl No.</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead className="text-center">
                Total Prepaid Customers
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
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-center font-bold">18,56,833</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ZonePercentageTable;
