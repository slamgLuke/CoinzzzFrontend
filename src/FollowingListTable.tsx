import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

export function FollowingListTable() {
  const { userId } = useUser();
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [fullFollowingList, setFullFollowingList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/TestUsers2.json").then((response) =>
        response.json(),
      );
      const user = data.find((user: { _id: string }) => user._id === userId);
      if (user) {
        setFollowingList(user.tracking_list);
      } else {
        setFollowingList([]);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchFullData = async () => {
      const data = await fetch("/TestCoinData.json").then((response) =>
        response.json(),
      );
      const fullList = followingList.map((symbol) =>
        data.find((coin: { symbol: string }) => coin.symbol === symbol),
      );
      setFullFollowingList(fullList);
    };

    if (followingList.length > 0) {
      fetchFullData();
    }
  }, [followingList]);

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
        {fullFollowingList.map((coin, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{coin.symbol}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {coin.marketCap}
            </TableCell>
            <TableCell className="text-center">{coin.price}</TableCell>
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
