import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/core/styles';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const useStyles = makeStyles({
    drawer: {
      width: '200px'
    }
  
  })

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();
   

    const itemList = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            path: '/'
        },
        {
            text: 'ADD STOCK',
            icon: <AddBusinessIcon />,
            path: '/stockform'
        },
        {
            text: 'STOCK LIST',
            icon: <PlaylistAddIcon />,
            path: '/stockdetails'
        },
        {
            text: 'ADD SALES',
            icon: <PointOfSaleIcon />,
            path: '/salesform'
        },
        {
            text: 'SALES LIST',
            icon: <AttachMoneyIcon />,
            path: '/salesdetails'
        },
        {
            text: 'SALES RECORD',
            icon: <AttachMoneyIcon />,
            path: '/weeklysalesreport'
        },
        {
            text: 'GRAPH',
            icon: <AttachMoneyIcon />,
            path: '/graph'
        }
    ]
    return(
        <MUIDrawer variant="permanent" className={classes.drawer}>
            <List>
                {itemList.map(item => (

                    <ListItem 
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
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