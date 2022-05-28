import React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box, Drawer, 
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Icon from '../assets/images/ICON.svg';
import useAuth from '../hooks/useAuth';
import SidebarMenu from '../components/SidebarMenu';

export default function Layout() {
  const { logout } = useAuth();
  const drawerWidth = 250;
  const handleCloseUser = () => {
    logout();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: (theme) => theme.palette.common.grey,
      }}
    >
      <CssBaseline />
      <Box id="noprint">
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            position: 'fixed',
            height: (theme) => theme.spacing(12),
            paddingRight: 0,
            padding: (theme) => theme.spacing(0, 0, 0, 5),
            backgroundColor: (theme) => theme.palette.common.lightergreen,
          }}
        />
      </Box>
      <Box sx={{ width: drawerWidth }} id="noprint">
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              backgroundColor: (theme) => theme.palette.common.green,
            },
          }}
        >
          <Toolbar>
            <Typography
              sx={{
                flexGrow: 1,
                cursor: 'pointer',
                pl: 10,
              }}
            >
              <img src={Icon} alt="logo" height="50px" width="70px" />
            </Typography>
          </Toolbar>

          <Box m={3} />
          <Box mx={3} display="flex" flexDirection="column">
            <SidebarMenu />
          </Box>
          <Toolbar>
            <Box
              sx={{
                borderRadius: 2,
                display: 'flex',
                flexGrow: 1,
                height: 50,
                padding: (theme) => theme.spacing(4),
                backgroundColor: (theme) => theme.palette.common.lightYellow,
                cursor: 'pointer',
                alignItems: 'center',
                marginTop: 45,
              }}
            >
                  <Box
                    onClick={() => {
                      handleCloseUser();
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={120}
                  >
                    <Box m={1} />
                    <Typography noWrap fontWeight="fontWeightBold">
                      Logout
                    </Typography>
                  </Box>
              <Box mr={5} />
            </Box>
          </Toolbar>
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          '@media print': { padding: (theme) => theme.spacing(0, 0, 2, 0) },
          padding: (theme) => theme.spacing(17, 5, 0, 5),
          overflow: 'auto',
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
