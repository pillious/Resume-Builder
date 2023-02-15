import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

interface IProps {
    deleteExperience: () => void;
}

const DeleteExperience: React.FC<IProps> = (props) => {
    return (
        <IconButton
            color="error"
            title="Delete experience"
            onClick={() => {
                props.deleteExperience();
            }}
        >
            <DeleteOutlineIcon
                sx={{
                    "&:hover": {
                        transform: "scale(1.25)",
                        cursor: "pointer",
                    },
                    transition: "200ms",
                }}
            />
        </IconButton>
    );
};

export default DeleteExperience;
