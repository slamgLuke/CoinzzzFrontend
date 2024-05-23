import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CoinTable from './components/CoinTable';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: 20 }}>
        <Topbar />
        <CoinTable />
        {/* Agrega más componentes aquí */}
      </Box>
    </Box>
  );
};

export default App;
