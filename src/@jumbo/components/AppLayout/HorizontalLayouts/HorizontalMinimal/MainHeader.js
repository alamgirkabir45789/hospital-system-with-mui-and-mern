import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, darken, Hidden, Toolbar, Typography } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { PostAdd } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Horizontal/SidebarToggleHandler';
import CmtHorizontal from '../../../../../@coremat/CmtNavigation/Horizontal';
import Logo from '../../partials/Logo';
import UserDropDown from '../../partials/UserDropDown';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: 0,
    minHeight: 10,
    [theme.breakpoints.down('md')]: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    '& .Cmt-appIcon': {
      color: theme.palette.text.secondary,
      '&:hover, &:focus': {
        color: darken(theme.palette.text.secondary, 0.2),
      },
      [theme.breakpoints.down('xs')]: {
        padding: 7,
      },
    },
    '& .Cmt-horizontalNavMenu': {
      position: 'static',
      '& .Cmt-navMegaBtn, & > .Cmt-navCollapse > .Cmt-navCollapseBtn': {
        minHeight: 64,
      },
    },
  },
  langRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 2,
      zIndex: 1,
      height: 35,
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15),
    },
  },
  searchIcon: {
    [theme.breakpoints.down('xs')]: {
      padding: 9,
    },
  },
}));

const MainHeader = () => {
  const classes = useStyles();
  const { userPermission } = useSelector(({ auth }) => auth);
  const { authUser } = useSelector(({ auth }) => auth);
  console.log(authUser, userPermission);
  const minimalHorizont = [
    {
      name: <IntlMessages id={'Home'} />,
      type: 'collapse',
      children: [
        {
          name: <IntlMessages id={'pages.samplePage'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/sample-page',
        },
      ],
    },
    {
      name: <IntlMessages id={'About'} />,
      type: 'collapse',
      children: [
        // {
        //   name: <IntlMessages id={'Dashboard'} />,
        //   type: 'item',
        //   icon: <PostAdd />,
        //   link: '/dashboard',
        // },
        {
          name: <IntlMessages id={'About'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/about',
        },
      ],
    },
    authUser
      ? {
          name: <IntlMessages id={'Appointment'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={'Add patient'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/appointment/new-appointment',
            },

            {
              name: <IntlMessages id={'Patient List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/appointment',
            },
          ],
        }
      : {},
    authUser
      ? {
          name: <IntlMessages id={'User'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={'Add User'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/user/new-user',
            },

            {
              name: <IntlMessages id={'User List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/user',
            },
          ],
        }
      : {},
    authUser
      ? {
          name: <IntlMessages id={'Doctor'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={'Add Doctor'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/doctor/new-doctor',
            },

            {
              name: <IntlMessages id={'Doctor List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/doctor',
            },
          ],
        }
      : {},
    authUser
      ? {
          name: <IntlMessages id={'Department'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={' Department List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/department',
            },
          ],
        }
      : {},
    authUser
      ? {
          name: <IntlMessages id={'Schedule'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={'Schedule List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/schedule',
            },
          ],
        }
      : {},
    authUser
      ? {
          name: <IntlMessages id={'Role'} />,
          type: 'collapse',
          children: [
            {
              name: <IntlMessages id={'Role List'} />,
              type: 'item',
              icon: <PostAdd />,
              link: '/role',
            },
          ],
        }
      : {},
    {
      name: <IntlMessages id={'Contact'} />,
      type: 'collapse',
      children: [
        {
          name: <IntlMessages id={'Dashboard'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/dashboard',
        },
      ],
    },
  ];

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      <Logo mr={{ xs: 2, sm: 4, lg: 6, xl: 8 }} color="white" />
      <Hidden mdDown>
        <CmtHorizontal menuItems={minimalHorizont} />
      </Hidden>

      <Box display="flex" alignItems="center" ml="auto">
        {/* <SearchPopover iconClassName={clsx(classes.searchIcon, 'Cmt-searchIcon')} /> */}
        {/* <AppsMenu /> */}
        {/* <HeaderMessages /> */}
        {/* <HeaderNotifications /> */}
        {/* <Box className={clsx(classes.langRoot, 'Cmt-i18
        n-switch')}>
          <LanguageSwitcher />
        </Box> */}
        <UserDropDown />
        <Typography component="div">{authUser?.name}</Typography>
      </Box>
    </Toolbar>
  );
};

export default MainHeader;
