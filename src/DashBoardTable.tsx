import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star } from "lucide-react";

const data = [
  {
    name: 'BTC',
    marketCap: '20B',
    price: '69,523',
    today: '+2.12%',
    week: '+8.21%',
    favorite: false,
  },
  {
    name: 'ETH',
    marketCap: '15B',
    price: '4,123',
    today: '+1.5%',
    week: '+5.4%',
    favorite: true,
  }
];

export default function DashboardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">MarketCap</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="hidden sm:table-cell">Today</TableHead>
          <TableHead className="hidden sm:table-cell">7D</TableHead>
          <TableHead className="hidden sm:table-cell">Favourite</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{item.name}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{item.marketCap}</TableCell>
            <TableCell className="text-center">{item.price}</TableCell>
            <TableCell className="hidden md:table-cell">{item.today}</TableCell>
            <TableCell className="hidden md:table-cell">{item.week}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Star id="star" className={item.favorite ? "star" : "unselected_star"} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}
