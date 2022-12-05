import GridContainer from '@jumbo/components/GridContainer';
import { Box, Grid, lighten } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import Axios from 'axios';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import doctor from '../../../assets/hero.jpg';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,

    // maxWidth: 345,
    // margin: '0 auto',
    // backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  root2: {
    maxWidth: 345,
    margin: '0 auto',
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const DoctorList = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [doctors, setDoctors] = useState([]);
  console.log({ props, doctors });
  const getAllDoctor = async () => {
    if (props.value === 0) {
      const res = await Axios.get(`http://localhost:7000/api/doctor/department/${'6343cd1edff92da6be9c538b'}`);
      setDoctors(res.data.map(d => ({ ...d, isOpen: false })));
    }
    if (props.value === 1) {
      const res = await Axios.get(`http://localhost:7000/api/doctor/department/${'6369f83ea595fdf8b545ed4b'}`);
      setDoctors(res.data);
    }
    if (props.value === 2) {
      const res = await Axios.get(`http://localhost:7000/api/doctor/department/${'6369f83ea95fdf8b545ed4b'}`);
      setDoctors(res.data);
    }
  };
  useEffect(() => {
    getAllDoctor();
  }, []);

  const handleExpandClick = index => {
    const _doctor = [...doctors];
    const selectedDoctor = _doctor[index];
    selectedDoctor.isOpen = !selectedDoctor.isOpen;
    _doctor[index] = selectedDoctor;
    setDoctors(_doctor);
    // setExpanded(!expanded);
  };
  return (
    <Box className={classes.root}>
      <Typography className="mb-2" align="center">
        Our Doctors
      </Typography>

      <GridContainer>
        {doctors?.length > 0 ? (
          doctors?.map((dc, index) => (
            <Fragment key={dc._id}>
              <Grid item sm={6}>
                <Card style={{ marginLeft: '10px', marginRight: '10px' }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={dc?.name}
                    subheader="September 14, 2016"
                  />
                  <CardMedia className={classes.media} image={doctor} title="Paella dish" />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1
                      cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: dc.isOpen,
                      })}
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={dc.isOpen}
                      aria-label="show more">
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={dc.isOpen} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                      </Typography>

                      <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </Fragment>
          ))
        ) : (
          <Typography className="text-center">No Doctor Found</Typography>
        )}
      </GridContainer>
    </Box>
  );
};

export default DoctorList;
