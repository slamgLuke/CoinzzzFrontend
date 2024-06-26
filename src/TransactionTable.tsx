import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionTable({ transactions }) {
  function parse(value: string) {
    let value_float = parseFloat(value);
    return Math.round((value_float + Number.EPSILON) * 100) / 100;
  }
  console.log(transactions);
  return (
    <Card className="margin-0">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sm:table-cell text-center">Coin</TableHead>
              <TableHead className="sm:table-cell text-center">Type</TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Date
              </TableHead>
              <TableHead className="hidden sm:table-cell text-center">
                Price
              </TableHead>
              <TableHead className="sm:table-cell text-center">
                Quantity
              </TableHead>
              <TableHead className="text-right">USDT Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{item.symbol}</div>
                </TableCell>
                <TableCell className="sm:table-cell">
                  <Badge
                    className="text-xs"
                    variant={
                      item.type.toLowerCase() === "buy"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.date}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {parse(item.price) === 0 ? item.price : parse(item.price)}
                </TableCell>
                <TableCell className="sm:table-cell">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {parse(item.value) === 0 ? item.price : parse(item.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default TransactionTable;
