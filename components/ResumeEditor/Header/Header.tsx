import { Box, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { guid, IItem } from "../../../types";
import { sortByOrder } from "../../../utils/utils";
import ConfirmationModal from "../../UI/ConfirmationModal";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import HeaderButtonGroup from "./HeaderButtonGroup";
import Info from "./Info";

interface IProps {
    name: string;
    items: IItem[];
    areToolsActive: boolean;
    addHeaderInfo: () => void;
    updateHeaderName: (name: string) => void;
    updateHeaderInfo: (itemId: guid, content: string) => void;
    deleteHeaderInfo: (itemId: guid) => void;
}

const Header: React.FC<IProps> = ({
    name,
    items,
    areToolsActive,
    updateHeaderName,
    updateHeaderInfo,
    addHeaderInfo,
    deleteHeaderInfo,
}) => {
    const theme = useTheme();

    const [info, setInfo] = useState<JSX.Element[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addInfo = useCallback(
        (item: IItem) => {
            setInfo((prev) => [
                ...prev,
                <Info
                    key={item.id}
                    placeholder="Personal info"
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
        sortByOrder<IItem>(items).forEach((item) => addInfo(item));
    }, [items, addInfo]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1,
                }}
            >
                <Box
                    sx={{
                        width: "max(200px, 40%)",
                        "& input": {
                            textAlign: "center",
                        },
                    }}
                >
                    <DebouncedTextarea
                        sx={{
                            fontSize: "1.25rem",
                            width: "100%",
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            "&:hover": {
                                backgroundColor: theme.palette.overlay,
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
                    {areToolsActive && (
                        <HeaderButtonGroup
                            addHeaderInfo={addHeaderInfo}
                            deleteHeaderInfo={() => setIsModalOpen(true)}
                        />
                    )}
                </Box>
            </Box>

            <ConfirmationModal
                open={isModalOpen}
                title="Delete Confirmation"
                text={`Do you want to permanently delete "${
                    items.length > 0
                        ? items[items.length - 1].content.substring(0, 30)
                        : "" 
                }"${
                    items.length > 0 &&
                    items[items.length - 1].content.length > 30
                        ? "..."
                        : ""
                }?`}
                handleConfirm={() => {
                    if (items.length > 0)
                        deleteHeaderInfo(items[items.length - 1].id);
                }}
                handleClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Header;
