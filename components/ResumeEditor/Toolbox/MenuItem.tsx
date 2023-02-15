import {
    ListItemIcon,
    ListItemText, MenuItem as MuiMenuItem
} from "@mui/material";
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
                sx={{
                    minWidth: "unset !important",
                    "& svg": { fontSize: "18px" },
                }}
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
                    },
                }}
            >
                {props.text}
            </ListItemText>
        </MuiMenuItem>
    );
};

export default MenuItem;
