import { Button, Box } from "@mui/material";

interface IProps {
    addExperience: () => void;
}

const AddExperience: React.FC<IProps> = (props) => {
    return (
        <Box sx={{ mt: 1 }}>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={props.addExperience}
                sx={{
                    fontSize: "12px",
                }}
            >
                Add Experience
            </Button>
        </Box>
    );
};

export default AddExperience;
