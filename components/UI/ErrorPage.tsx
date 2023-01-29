import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Logo from "./Logo";

interface IProps {
    statusCode: number;
    message: string;
}

const ErrorPage: React.FC<IProps> = (props) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Logo height={128} width={128} />
            <Typography
                fontWeight="600"
                fontSize="1.5rem"
                letterSpacing="0.05rem"
                my="1rem"
            >
                {props.statusCode} | {props.message}
            </Typography>
            <Button
                variant="outlined"
                color="info"
                startIcon={<HomeIcon />}
                onClick={() => router.push("/")}
            >
                Return Home
            </Button>
        </Box>
    );
};
export default ErrorPage;
