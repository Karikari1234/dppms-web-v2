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

const ShortCodeTable = () => {
  const listOfShortCode = meterShortCodes.map((item) => (
    <>
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.information} </TableCell>
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
        <TableCaption>A list of meter short codes.</TableCaption>
        <TableHeader className="">
          <TableRow className="bg-gray-100">
            <TableHead className="">Serial No.</TableHead>
            <TableHead className="">Information</TableHead>
            <TableHead>All Meters</TableHead>
            <TableHead>(Legacy) Inhe Meter(1P)</TableHead>
            <TableHead>(Legacy) Inhe Meter(3P)</TableHead>
            <TableHead>(Legacy) Linyang Meter</TableHead>
            <TableHead>(Legacy) Eastern Meter(EMPP0)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{listOfShortCode}</TableBody>
      </Table>
    </div>
  );
};

export default ShortCodeTable;
