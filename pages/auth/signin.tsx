import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import {
    Box,
    Button,
    Paper,
    Typography,
    Divider,
    useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";

interface IProps {
    providers: Provider[];
}

const SignIn: React.FC<IProps> = ({ providers }) => {
    const theme = useTheme();

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
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        height={96}
                        width={96}
                        style={{ margin: "0 auto 1rem auto" }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 24,
                            letterSpacing: ".15rem",
                            textDecoration: "none",
                            textAlign: "center",
                            color: theme.palette.info.main,
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
                        color="secondary"
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
