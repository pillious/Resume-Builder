import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip
} from "@mui/material";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import AppContext from "../../../store/AppContext";
import AuthContext from "../../../store/AuthContext";
import fetcher from "../../../utils/fetcher";
import InputModal from "../../UI/InputModal";

const CreateButton: React.FC = () => {
    const { mutate } = useSWRConfig();
    const { userId } = useContext(AuthContext);
    const { updateActiveResumeId } = useContext(AppContext);

    const [createWithTemplate, setCreateWithTemplate] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    // Handle dropdown state.
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenDropdown(true);
    };
    const handleDropdownClose = () => {
        setAnchorEl(null);
        setOpenDropdown(false);
    };

    const createNewResume = async (fileName: string) => {
        try {
            await fetcher(`/api/createResume`, {
                method: "POST",
                body: JSON.stringify({
                    fileName,
                    userId,
                    useTemplate: createWithTemplate,
                }),
            }).then(async (resp) => {
                await mutate(`/api/getResumeIds?userId=${userId}`); // tell all SWRs with this key to revalidate
                if ("data" in resp && "id" in resp.data) {
                    updateActiveResumeId(resp.data.id);
                }
            });
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <>
            <ListItem disablePadding>
                <Tooltip title="Create Resume" placement="right">
                    <ListItemButton
                        onClick={handleDropdownClick}
                        sx={{ margin: "1rem 0 0", padding: "0.5rem 0" }}
                    >
                        <ListItemIcon sx={{ transform: "translateX(0.5rem)" }}>
                            <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>
            </ListItem>

            <Menu
                id="new-resume-menu"
                aria-labelledby="new-resume-menu"
                anchorEl={anchorEl}
                open={openDropdown}
                onClose={handleDropdownClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                sx={{
                    "& .MuiPaper-root": {
                        transform: "translateX(2.5rem) !important",
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        setCreateWithTemplate(false);
                        handleModalOpen();
                        handleDropdownClose();
                    }}
                >
                    Create blank resume
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        setCreateWithTemplate(true);
                        handleModalOpen();
                        handleDropdownClose();
                    }}
                >
                    Create resume from template
                </MenuItem>
            </Menu>

            <InputModal
                open={openModal}
                handleClose={handleModalClose}
                handleConfirm={(fileName) => createNewResume(fileName)}
                title="Create a Resume:"
                label="Document Name"
            />
        </>
    );
};

export default CreateButton;
