import { Box } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CmtImage from '../../../../@coremat/CmtImage';
import lgr from '../../../../assets/departments-1.jpg';
const FooterLogo = ({ color, ...props }) => {
  const logoUrl = color === 'white' ? lgr : lgr;

  return (
    <Box className="pointer" {...props}>
      <NavLink to="/">
        <CmtImage src={logoUrl} alt="logo" style={{ height: '30px', width: '30px' }} />
      </NavLink>
    </Box>
  );
};

export default FooterLogo;
