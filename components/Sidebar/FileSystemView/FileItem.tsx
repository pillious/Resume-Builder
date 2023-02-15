import DescriptionIcon from "@mui/icons-material/Description";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import { useContext, useMemo } from "react";
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
    const { updateActiveResumeId, hasUnsavedChanges } = useContext(AppContext);

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
                    onClick={() => {
                        if (!active) {
                            if (hasUnsavedChanges) {
                                if (
                                    confirm(
                                        "Are you sure you want to discard your changes?"
                                    ) === true
                                )
                                    clickHandler();
                            } else clickHandler();
                        }
                    }}
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
                    <Typography fontWeight={700} fontSize="0.875rem">
                        {name}
                    </Typography>
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default FileItem;
