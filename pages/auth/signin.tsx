import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import GoogleIcon from "@mui/icons-material/Google";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

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
                alignContent: "center",
            }}
        >
            <Paper sx={{ height: "20%" }}>
                <Box>
                    <AdbIcon sx={{ mx: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                </Box>
                {Object.values(providers).map((provider) => (
                    <Button
                        onClick={() => signIn(provider.id)}
                        variant="outlined"
                        startIcon={<GoogleIcon htmlColor="#333" />}
                        key={provider.name}
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
