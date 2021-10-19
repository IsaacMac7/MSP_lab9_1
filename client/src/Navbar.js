import React from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/core/styles';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const useStyles = makeStyles({
    drawer: {
      width: '200px'
    },
    paper: {
        background: "#8F99E7",
        color: "#FFFFFF"
    },
    active: {
        background: '#6D78C7'
    }
  
  })
  

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const itemList = [
        {
            text: 'ADD STOCK',
            icon: <AddBusinessIcon style={{color: 'white'}}/>,
            path: '/stockform'
        },
        {
            text: 'STOCK LIST',
            icon: <PlaylistAddIcon style={{color: 'white'}}/>,
            path: '/stockdetails'
        },
        {
            text: 'ADD SALES',
            icon: <PointOfSaleIcon style={{color: 'white'}}/>,
            path: '/salesform'
        },
        {
            text: 'SALES LIST',
            icon: <AttachMoneyIcon style={{color: 'white'}}/>,
            path: '/salesdetails'
        },
        {
            text: 'WEEKLY $',
            icon: <TrendingUpIcon style={{color: 'white'}}/>,
            path: '/weeklysalesreport'
        },
        {
            text: 'MONTHLY $',
            icon: <TrendingUpIcon style={{color: 'white'}}/>,
            path: '/monthlysalesreport'
        },
        {
            text: 'GRAPH',
            icon: <AttachMoneyIcon style={{color: 'white'}}/>,
            path: '/graph'
        }
    ]
    return(
        <MUIDrawer 
        variant="permanent" 
        className={classes.drawer}
        classes={{paper: classes.paper}}>
            <div> 
                <Typography variant="h4">
                    PHP
                </Typography>
            </div>
            <Divider
           
             />
            <List>
                {itemList.map(item => (

                    <ListItem 
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                    >  

                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>

                    </ListItem>

                ))}
              
            </List>   
            


        </MUIDrawer>
    );

};
export default NavBar;