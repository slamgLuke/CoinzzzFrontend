import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const CoinTable: React.FC = () => {
  const rows = [
    { name: 'Bitcoin', marketcap: '20B', balance: '$5,777', price: '0.0000038', change7d: '+5.1%', changeToday: '-27.4%' },
    // Agrega más filas según sea necesario
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Marketcup</TableCell>
          <TableCell>Balance</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>7D</TableCell>
          <TableCell>Today</TableCell>
          <TableCell>Favourite</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.marketcap}</TableCell>
            <TableCell>{row.balance}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.change7d}</TableCell>
            <TableCell>{row.changeToday}</TableCell>
            <TableCell>
              <IconButton><StarIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinTable;
