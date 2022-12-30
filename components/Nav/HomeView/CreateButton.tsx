import { useContext, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import fetcher from "../../../utils/fetcher";
import { useSWRConfig } from "swr";
import { ApiResponse } from "../../../custom2.d";
import { Tooltip } from "@mui/material";
import InputModal from "../../UI/InputModal";
import AuthContext from "../../../store/AuthContext";

const CreateButton: React.FC = () => {
    const { mutate } = useSWRConfig();
    const { userId } = useContext(AuthContext);

    const createNewResume = async (fileName: string) => {
        try {
            const resp: ApiResponse = await fetcher(
                `/api/createResume`,
                { method: "POST", body: JSON.stringify({ fileName, userId }) }
            );
            mutate("/api/getResumeIds"); // tell all SWRs with this key to revalidate

            // TODO: is this even used?
            if ("data" in resp) {
                console.log(resp.data);
            } else {
                console.log(resp.error);
            }
        } catch (ex) {
            console.log(ex);
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
