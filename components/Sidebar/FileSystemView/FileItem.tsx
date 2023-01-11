import { useContext, useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import DescriptionIcon from "@mui/icons-material/Description";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import AppContext from "../../../store/AppContext";
import { guid } from "../../../types";
import { buildHSLString, pastelHSLColor } from "../../../utils/utils";

interface IProps {
    name: string;
    id: guid;
    active: boolean;
    iconSize?: number;
    iconColor?: string;
}

const FileItem: React.FC<IProps> = ({
    name,
    id,
    active,
    iconSize,
    iconColor,
}) => {
    const { updateActiveResumeId } = useContext(AppContext);

    const clickHandler = () => {
        updateActiveResumeId(id);
    };

    const HSLColor = useMemo(() => buildHSLString(pastelHSLColor()), []);

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    sx={{ m: 0, p: 0.5 }}
                    selected={active}
                    onClick={clickHandler}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: `${iconSize || 20}px`,
                            px: 0.5,
                        }}
                    >
                        <DescriptionIcon
                            sx={{
                                fontSize: iconSize || 20,
                            }}
                            htmlColor={iconColor || HSLColor}
                        />
                    </ListItemIcon>
                    <Typography
                        fontWeight={600}
                        color="rgb(80,80,80)"
                        fontSize="0.875rem"
                    >
                        {name}
                    </Typography>
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default FileItem;
