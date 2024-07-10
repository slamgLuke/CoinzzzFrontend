import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FollowingListTable({ coinData, followList }) {
  const filteredTrackingList = coinData.filter((coin) => {
    // Verificar si el _id de la moneda está presente en la lista de seguimiento (trackingList)
    return followList.includes(coin._id);
  });

  function round3(num) {
    return Math.round(num * 1000) / 1000;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">MarketCap</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="hidden sm:table-cell">Today</TableHead>
          <TableHead className="hidden sm:table-cell">7D</TableHead>
          <TableHead className="hidden sm:table-cell">30D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTrackingList.map((coin, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{coin._id}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {coin.marketCap}
            </TableCell>
            <TableCell className="text-center">{round3(parseFloat(coin.price))}</TableCell>
            <TableCell className="hidden md:table-cell">{coin.today}</TableCell>
            <TableCell className="hidden md:table-cell">{coin.week}</TableCell>
            <TableCell className="hidden sm:table-cell">TEMP</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FollowingListTable;
