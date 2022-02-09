import { makeStyles } from '@mui/styles';
import { Drawer } from "@mui/material";
import DrawerContent from "./drawer-content";

const useStyles = makeStyles({
    drawerPaper: {
        width: 280,
        marginTop: 80,
        borderRight: 0,
    },
});

export default function NavDrawer({ mobileOpen, handleDrawerToggle, isSmallerScreen }) {
    const classes = useStyles();

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <DrawerContent mobileOpen={mobileOpen} isSmallerScreen={isSmallerScreen} />
        </Drawer>
    );
}