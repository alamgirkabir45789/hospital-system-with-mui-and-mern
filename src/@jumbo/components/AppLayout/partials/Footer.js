import { Box, makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import React, { useContext } from 'react';
import { THEME_TYPES } from '../../../constants/ThemeOptions';
import AppContext from '../../contextProvider/AppContextProvider/AppContext';
import FooterLogo from './FooterLogo';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRoot: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px 12px',
      fontSize: 11,
    },
  },
}));

const Footer = props => {
  const classes = useStyles();
  const { themeType } = useContext(AppContext);
  const date = new Date();

  return (
    <Box className={classes.root} {...props}>
      <Box display="flex" alignItems="center">
        <Hidden xsDown>
          <FooterLogo mr={5} color={themeType === THEME_TYPES.DARK ? 'white' : ''} />
        </Hidden>
        <Box fontSize={{ xs: 12, sm: 14 }} component="p" color="text.disabled">
          Copyright Alamgir kabir © {date.getFullYear()}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
