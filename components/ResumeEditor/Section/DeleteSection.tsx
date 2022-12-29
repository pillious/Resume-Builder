import Button from "@mui/material/Button";

interface IProps {
    deleteSection: () => void;
}

const DeleteSection: React.FC<IProps> = (props) => {
    return (
        <Button
            size="small"
            variant="contained"
            sx={{
                bgcolor: "#ff355a",
                fontSize: "10px",
                lineHeight: "16px",
                p: "4px 0",
                ml: "8px",
                fontWeight: "600",
                "&:hover": {
                    bgcolor: "#fc5674",
                    transform: "translateY(-2px)",
                },
            }}
            onClick={props.deleteSection}
        >
            DELETE
        </Button>
    );
};

export default DeleteSection;
