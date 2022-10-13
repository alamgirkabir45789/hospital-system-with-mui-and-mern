import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import about from '../../../assets/about.jpg';
import department5 from '../../../assets/departments-5.jpg';
import hero from '../../../assets/hero.jpg';
import team2 from '../../../assets/team-2.jpg';
import team3 from '../../../assets/team-3.jpg';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: hero,
  },
  {
    label: 'Bird',
    imgPath: department5,
  },
  {
    label: 'Bali, Indonesia',
    imgPath: about,
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath: team2,
  },
  {
    label: 'Goč, Serbia',
    imgPath: team3,
  },
];
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(8),
    backgroundColor: theme.palette.background.light,
  },
  img: {
    height: 400,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    objectFit: 'cover',
  },
}));
const Customcarasoul = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };
  useEffect(() => {
    // const cont = document.querySelector('.makeStyles-appMainContentWrapper-45');
    // cont.setAttribute('style', 'flex-direction:row');
  }, []);

  return (
    <div>
      <Box className={classes.root}>
        <Paper square elevation={1} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents>
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    </div>
  );
};

export default Customcarasoul;
