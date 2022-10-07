import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Demo1 from './components/demo1-http/Demo1';
import Demo2 from './components/demo2-streaming/Demo2';
import Demo3 from './components/demo3-hol/Demo3';
import Demo4 from './components/demo4-graphql/Demo4';
import Demo5 from './components/demo5-http2/Demo5';
import Demo8 from './components/demo8-http3/Demo8';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const demos = [
    {
      name: 'Demo 1 - HTTP',
      url: '/demo1-http',
      component: Demo1,
    },
    {
      name: 'Demo 2 - Streaming',
      url: '/demo2-streaming',
      component: Demo2,
    },
    {
      name: 'Demo 3 - HOL',
      url: '/demo3-hol',
      component: Demo3,
    },
    {
      name: 'Demo 4 - GraphQL',
      url: '/demo4-graphql',
      component: Demo4,
    },
    {
      name: 'Demo 5 - HTTP/2',
      url: '/demo5-http2',
      component: Demo5,
    },
    {
      name: 'Demo 8 - HTTP/3',
      url: '/demo8-http3',
      component: Demo8,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Web Protocols Workshop
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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {demos.map((entry) => (
            <ListItem
              key={entry.url}
              disablePadding
              onClick={() => {
                setOpen(false) || history.push(entry.url);
              }}
            >
              <ListItemButton>
                <ListItemText primary={entry.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <div className="layout">
          <Switch>
            <Route exact path="/">
              <Redirect to={demos[0].url} />
            </Route>
            {demos.map((entry) => (
              <Route key={entry.url} exact path={entry.url} component={entry.component} />
            ))}
          </Switch>
        </div>
      </Main>
    </Box>
  );
}
