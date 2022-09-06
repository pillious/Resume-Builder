import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { guid } from "../../../custom2";

interface IProps {
    id: guid;
    deleteSection: (sectionId: guid) => void;
}

const DeleteSection: React.FC<IProps> = (props) => {
    return (
        <IconButton color="error">
            <DeleteOutlineIcon
                sx={{
                    color: "#ff0000",
                    "&:hover": {
                        transform: "scale(1.25)",
                        cursor: "pointer",
                    },
                    transition: "200ms",
                }}
                onClick={() => {
                    props.deleteSection(props.id);
                }}
            />
        </IconButton>
    );
};

export default DeleteSection;
