import { Box, Button } from "@mui/material";

interface IProps {
    handleSignIn: () => void;
    handleRegister: () => void;
}

const UnauthenticatedMenu: React.FC<IProps> = (props) => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
                onClick={props.handleSignIn}
                sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "inherit",
                }}
            >
                Sign In
            </Button>
            <Button
                onClick={props.handleRegister}
                sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "inherit",
                }}
            >
                Register
            </Button>
        </Box>
    );
};

export default UnauthenticatedMenu;
