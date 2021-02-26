import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { Router, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createBrowserHistory } from 'history';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SearchBar from './SearchBar';
import DrawerList from './DrawerList';
import AuthButton from './AuthButton';
import Routes from '../routing/Routes';
import Footer from '../navigation/Footer';

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 9999,
  },
  linkBrand: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logo: { paddingLeft: theme.spacing(2) },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '86vh',
  },
  contentRoot: {
    width: '85%',
    margin: '0 auto',
    paddingBottom: theme.spacing(3),
  },
  smallPadding: {
    marginTop: '4px',
    marginBottom: '4.5px',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function SideMenu(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.logo}>
        <h2 className={classes.smallPadding}>YTEmotes</h2>
        <p className={classes.smallPadding}>Add custom emotes to YT</p>
      </div>
      <DrawerList />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="#"
              variant="h5"
              color="inherit"
              underline="none"
              className={classes.linkBrand}
            >
              <img
                src="https://mui.dev/mui-assets/img/logo-pied-piper-white.png"
                alt=""
                width="120"
              />
            </Link>
            <Typography variant="h6" style={{ flex: 1 }}></Typography>
            <SearchBar />
            <AuthButton />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router history={history}>
            <div className={classes.contentRoot}>
              <Route component={Routes} />
            </div>
          </Router>
          <Footer />
        </main>
      </div>
    </Router>
  );
}
