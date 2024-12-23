import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Button, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

export default function PermanentDrawerLeft({content, handleLogout}) {
    const location = useLocation()
    const path = location.pathname
    //const drawerWidth = width
    const [open, setOpen] = React.useState(true)

    const changeOpenState = () => {
        setOpen(!open)
    }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
            <IconButton onClick={changeOpenState}>
                <MenuIcon/>
            </IconButton>
          <Typography variant="h6" noWrap component="div">
            Task Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        open = {open}
        onClose = {changeOpenState}
      >
        <Toolbar />
        <Divider />
        <List>

            <ListItem >
              <ListItemButton component={Link} to={"/"} selected={"/" === path}>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>

            <ListItem >
              <ListItemButton component={Link} to={"/Create"} selected={"/Create" === path}>
                <ListItemIcon>
                    <BorderColorIcon/>
                </ListItemIcon>
                <ListItemText primary={"Create"} />
              </ListItemButton>
            </ListItem>

        </List>
          {/* Logout Button at the Bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout} // Call the handleLogout function
          >
            Logout
          </Button>
        </Box>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
          {content}

      </Box>
    </Box>
  );
}
