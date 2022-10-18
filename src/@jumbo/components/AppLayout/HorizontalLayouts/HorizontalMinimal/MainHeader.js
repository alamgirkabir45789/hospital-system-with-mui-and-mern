import { Box, darken, Hidden, Toolbar } from '@material-ui/core';
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
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();

  const minimalHorizontalMenus = [
    {
      name: 'Home',
      type: 'collapse',
      children: [
        {
          name: 'Test1',
          type: 'item',
          icon: <PostAdd />,
          link: '/sample-page',
        },
        {
          name: 'Test5',
          type: 'collapse',
          children: [
            {
              name: 'Test6',
              type: 'item',
              icon: <PostAdd />,
              link: '/sample-page',
            },
            {
              name: 'Test 7',
              type: 'item',
              icon: <PostAdd />,
              link: '/sample-page',
            },
          ],
        },
        {
          name: 'Test 8',
          type: 'item',
          icon: <PostAdd />,
          link: '/sample-page',
        },
        {
          name: 'Test2',
          type: 'item',
          icon: <PostAdd />,
          link: '/test-page',
        },
      ],
    },
    authUser?.name === 'Admin'
      ? {
          name: 'Department',
          type: 'collapse',
          children: [
            {
              name: 'Medicine',
              type: 'item',
              icon: <PostAdd />,
              link: '/sample-page',
            },

            {
              name: 'Surgery',
              type: 'item',
              icon: <PostAdd />,
              link: '/test-page',
            },
          ],
        }
      : {},
    authUser?.name === 'Admin'
      ? {
          name: 'Doctor',
          type: 'collapse',
          children: [
            {
              name: 'Doctor List',
              type: 'item',
              icon: <PostAdd />,
              link: '/doctor-list',
            },

            {
              name: 'Surgery',
              type: 'item',
              icon: <PostAdd />,
              link: '/test-page',
            },
          ],
        }
      : {},
    {
      name: 'Services',
      type: 'collapse',
      children: [
        {
          name: 'Medicine',
          type: 'item',
          icon: <PostAdd />,
          link: '/sample-page',
        },

        {
          name: 'Surgery',
          type: 'item',
          icon: <PostAdd />,
          link: '/test-page',
        },
      ],
    },
    authUser?.name === 'Admin'
      ? {
          name: 'Home2',
          type: 'collapse',
          children: [
            {
              name: 'Test1',
              type: 'item',
              icon: <PostAdd />,
              link: '/sample-page',
            },

            {
              name: 'Test2',
              type: 'item',
              icon: <PostAdd />,
              link: '/test-page',
            },
          ],
        }
      : {},
  ];
  return (
    <Toolbar className={classes.root} style={{ color: 'black' }}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      <Logo mr={{ xs: 2, sm: 4, lg: 6, xl: 8 }} color="black" />
      <Hidden mdDown>
        <CmtHorizontal menuItems={minimalHorizontalMenus} />
      </Hidden>

      <Box display="flex" alignItems="center" ml="auto">
        {/* <SearchPopover iconClassName={clsx(classes.searchIcon, 'Cmt-searchIcon')} /> */}
        {/* <AppsMenu /> */}
        {/* <HeaderMessages /> */}
        {/* <HeaderNotifications /> */}
        {/* <Box className={clsx(classes.langRoot, 'Cmt-i18n-switch')}>
          <LanguageSwitcher />
        </Box> */}
        <UserDropDown />
      </Box>
    </Toolbar>
  );
};

export default MainHeader;
