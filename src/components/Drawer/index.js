import { makeStyles } from '@mui/styles';
import { Drawer } from "@mui/material";
import DrawerContent from "./drawer-content";

const useStyles = makeStyles({
    drawerPaper: {
        borderRight: 0,
    },
});

export default function Sidebar({ mobileOpen }) {
    const classes = useStyles();
    return (
        <Drawer 
            variant="permanent" 
            anchor="left" 
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerContent mobileOpen={mobileOpen} />
        </Drawer>
    );
}
