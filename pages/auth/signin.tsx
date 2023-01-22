import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { Box, Button, Paper, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LogoName from "../../components/UI/LogoName";
import Logo from "../../components/UI/Logo";

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
                    <Logo
                        height={96}
                        width={96}
                        style={{ margin: "0 auto 1rem auto" }}
                    />
                    <LogoName />
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
