import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import Info from "./Info";
import { guid, IItem } from "../../../custom2";

interface IProps {
    name: string;
    items: IItem[];
    addHeaderInfo: () => void;
    updateHeaderName: (name: string) => void;
    updateHeaderInfo: (itemId: guid, content: string) => void;
    deleteHeaderInfo: (itemId: guid) => void;
}

const Header: React.FC<IProps> = ({
    name,
    items,
    updateHeaderName,
    updateHeaderInfo,
    addHeaderInfo,
    deleteHeaderInfo,
}) => {
    const [info, setInfo] = useState<JSX.Element[]>([]);
    const addInfo = useCallback(
        (item: IItem) => {
            setInfo((prev) => [
                ...prev,
                <Info
                    key={item.id}
                    placeholder="Personal info..."
                    defaultValue={item.content ?? ""}
                    onChange={(value: string) => {
                        updateHeaderInfo(item.id, value);
                    }}
                />,
            ]);
        },
        [updateHeaderInfo]
    );

    useEffect(() => {
        setInfo([]);
        items
            .sort((prev, curr) => prev.order - curr.order)
            .forEach((item) => addInfo(item));
    }, [items, addInfo]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.25rem",
                mb: "0.5rem",
            }}
        >
            <Box
                sx={{
                    "& input": { textAlign: "center" },
                }}
            >
                <DebouncedTextarea
                    sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        maxWidth: "300px",
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                            backgroundColor: "#ddd",
                        },
                        "& input": { textAlign: "center" },
                    }}
                    defaultValue={name}
                    placeholder="Name"
                    multiline={false}
                    onChange={(value: string) => updateHeaderName(value)}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.25rem",
                    py: "0.5rem",
                }}
            >
                {[...info]}
                <Box>
                    <Fab
                        sx={{
                            width: "20px",
                            minHeight: "20px",
                            height: "20px",
                            mr: "0.25rem",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                            "& svg": {
                                height: 16,
                            },
                        }}
                        size="small"
                        color="info"
                        aria-label="add"
                        onClick={addHeaderInfo}
                    >
                        <AddIcon />
                    </Fab>
                    <Fab
                        sx={{
                            width: "20px",
                            minHeight: "20px",
                            height: "20px",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                            "& svg": {
                                height: 16,
                            },
                        }}
                        size="small"
                        color="warning"
                        aria-label="remove"
                        onClick={() =>
                            deleteHeaderInfo(items[items.length - 1].id)
                        }
                    >
                        <RemoveIcon />
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
