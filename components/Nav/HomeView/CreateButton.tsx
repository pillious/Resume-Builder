import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import fetcher from "../../../utils/fetcher";
import { useSWRConfig } from "swr";
import { ResponseSuccess, ResponseError } from "../../../custom2.d";
import { Tooltip } from "@mui/material";

const CreateButton: React.FC = () => {
    const { mutate } = useSWRConfig();

    const clickHandler = async () => {
        try {
            const resp: ResponseSuccess | ResponseError = await fetcher(
                "/api/createResume",
                "",
                { method: "POST" }
            );
            mutate("/api/getResumes"); // tell all SWRs with this key to revalidate

            if ("data" in resp) {
                console.log(resp.data);
            } else {
                console.log(resp.error);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <ListItem disablePadding>
            <Tooltip title="Create Resume" placement="right">
                <ListItemButton
                    onClick={clickHandler}
                    sx={{ margin: "1rem 0 0", padding: "0.5rem 0" }}
                >
                    <ListItemIcon sx={{ transform: "translateX(0.5rem)" }}>
                        <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export default CreateButton;
