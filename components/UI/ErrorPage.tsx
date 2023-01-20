import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

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
            <Image src="/logo.svg" alt="logo" height={128} width={128} />
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
