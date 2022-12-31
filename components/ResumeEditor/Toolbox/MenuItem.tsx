import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactElement } from "react";

interface IProps {
    text: string;
    handleClick: () => void;
    icon: ReactElement;
}

const MenuItem: React.FC<IProps> = (props) => {
    return (
        <MuiMenuItem onClick={props.handleClick}>
            <ListItemIcon
                sx={{ minWidth: "unset !important", "& svg": { fontSize: "18px" } }}
            >
                {props.icon}
            </ListItemIcon>
            <ListItemText
                sx={{
                    "& span": {
                        fontSize: "12px",
                        px: "1rem",
                        textTransform: "capitalize",
                        minWidth: "32px",
                        color: "#000",
                    },
                }}
            >
                {props.text}
            </ListItemText>
        </MuiMenuItem>
    );
};

export default MenuItem;
