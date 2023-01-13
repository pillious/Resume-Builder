import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import GoogleIcon from "@mui/icons-material/Google";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

interface IProps {
    providers: Provider[];
}

const SignIn: React.FC<IProps> = ({ providers }) => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper sx={{ p: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <AdbIcon sx={{ m: "auto" }} fontSize="large" />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 24,
                            letterSpacing: ".15rem",
                            color: "inherit",
                            textDecoration: "none",
                            textAlign: "center",
                        }}
                    >
                        Resume App
                    </Typography>
                </Box>
                <Divider flexItem sx={{ my: 2 }} />

                {Object.values(providers).map((provider) => (
                    <Button
                        onClick={() => signIn(provider.id)}
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        key={provider.name}
                        sx={{ mx: 1, borderRadius: "2rem" }}
                    >
                        Sign in with {provider.name}
                    </Button>
                ))}
            </Paper>
        </Box>
    );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
    context
): Promise<GetServerSidePropsResult<{ [key: string]: unknown }>> => {
    const { req } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    return {
        props: {
            providers: await getProviders(),
        },
    };
};
