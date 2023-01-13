import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IProps {
    addHeaderInfo: () => void;
    deleteHeaderInfo: () => void;
}

const HeaderButtonGroup: React.FC<IProps> = (props) => {
    return (
        <Box>
            <Fab
                sx={{
                    width: "20px",
                    minHeight: "20px",
                    height: "20px",
                    mr: "0.25rem",
                    "&:hover": {
                        transform: "scale(1.1)",
                    },
                    "& svg": {
                        height: 16,
                    },
                }}
                size="small"
                color="primary"
                aria-label="add"
                onClick={props.addHeaderInfo}
            >
                <AddIcon />
            </Fab>
            <Fab
                sx={{
                    width: "20px",
                    minHeight: "20px",
                    height: "20px",
                    "&:hover": {
                        transform: "scale(1.1)",
                    },
                    "& svg": {
                        height: 16,
                    },
                }}
                size="small"
                color="error"
                aria-label="remove"
                onClick={props.deleteHeaderInfo}
            >
                <RemoveIcon />
            </Fab>
        </Box>
    );
};

export default HeaderButtonGroup;
