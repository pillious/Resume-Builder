import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IProps {
    deleteSection: () => void;
}

const DeleteSection: React.FC<IProps> = (props) => {
    return (
        <IconButton
            color="error"
            title="Delete section"
            onClick={props.deleteSection}
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

export default DeleteSection;
