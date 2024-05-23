import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserIcon from '@mui/icons-material/AccountCircle';

const Topbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          My Profile
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <div>
          <InputBase placeholder="Search…" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
        <IconButton>
          <UserIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
