import { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

interface IProps {
    profileImg: string | null | undefined;
    profileName: string | null | undefined;
    anchorElem: null | HTMLElement;
    handleMenuOpen: (event: MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleSignOut: () => void;
}

const AuthenticatedMenu: React.FC<IProps> = (props) => {
    return (
        <>
            <IconButton onClick={props.handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                    alt={props.profileName ?? ""}
                    src={props.profileImg ?? ""}
                    imgProps={{ referrerPolicy: "no-referrer" }}
                />
            </IconButton>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={props.anchorElem}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(props.anchorElem)}
                onClose={props.handleMenuClose}
            >
                <MenuItem onClick={props.handleSignOut}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AuthenticatedMenu;
