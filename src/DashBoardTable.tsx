import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardTable({ coinData }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">MarketCap</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="hidden sm:table-cell">Today</TableHead>
          <TableHead className="hidden sm:table-cell">7D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coinData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{item._id}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {item.marketCap}
            </TableCell>
            <TableCell className="text-center">{item.price}</TableCell>
            <TableCell className="hidden md:table-cell">{item.today}</TableCell>
            <TableCell className="hidden md:table-cell">{item.week}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
