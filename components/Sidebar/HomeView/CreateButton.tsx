import { useContext, useState } from "react";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import fetcher from "../../../utils/fetcher";
import { useSWRConfig } from "swr";
import { Tooltip } from "@mui/material";
import InputModal from "../../UI/InputModal";
import AuthContext from "../../../store/AuthContext";
import AppContext from "../../../store/AppContext";

const CreateButton: React.FC = () => {
    const { mutate } = useSWRConfig();
    const { userId } = useContext(AuthContext);
    const { updateActiveResumeId } = useContext(AppContext);

    const createNewResume = async (fileName: string) => {
        try {
            await fetcher(`/api/createResume`, {
                method: "POST",
                body: JSON.stringify({ fileName, userId }),
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

    const [openModal, setOpenModal] = useState(false);

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    return (
        <>
            <ListItem disablePadding>
                <Tooltip title="Create Resume" placement="right">
                    <ListItemButton
                        onClick={handleModalOpen}
                        sx={{ margin: "1rem 0 0", padding: "0.5rem 0" }}
                    >
                        <ListItemIcon sx={{ transform: "translateX(0.5rem)" }}>
                            <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>
            </ListItem>

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
