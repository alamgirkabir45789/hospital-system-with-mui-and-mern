import Customcarasoul from '@jumbo/utils/custom/Customcarasoul';
import CustomTab from '@jumbo/utils/custom/CustomTab';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import AccordionMessage from 'views/accordion/AccordionMessage';
import Appointment from 'views/Appointment/form/AppointmentAddForm';
import GridContainer from '../../@jumbo/components/GridContainer';
import PageContainer from '../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../@jumbo/utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: <IntlMessages id={'pages.samplePage'} />, isActive: true },
];

const SamplePage = () => {
  return (
    <PageContainer>
      <GridContainer>
        <Grid container spacing={5}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Appointment />
              <AccordionMessage />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
              <Customcarasoul />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CustomTab />
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default SamplePage;
