import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import DescriptionIcon from "@mui/icons-material/Description";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import AppContext from "../../../store/AppContext";

const iconSize = 20;
const color = "rgb(50, 50, 50)";

interface IProps {
    name: string;
    id: string;
}

const FileItem: React.FC<IProps> = ({ name, id }) => {
    const ctx = useContext(AppContext);

    const clickHandler = () => {
        ctx.onActiveResumeChange(id);
    };

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton sx={{ m: 0, p: 0.5 }} onClick={clickHandler}>
                    <ListItemIcon
                        sx={{
                            minWidth: `${iconSize}px`,
                            px: 0.5,
                        }}
                    >
                        <DescriptionIcon
                            sx={{
                                fontSize: iconSize,
                            }}
                        />
                    </ListItemIcon>
                    <Typography fontWeight={600} color={color}>
                        {name}
                    </Typography>
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default FileItem;
