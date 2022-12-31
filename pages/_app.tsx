import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AppContextProvider } from "../store/AppContext";
import { AuthContextProvider } from "../store/AuthContext";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar/Navbar";

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <AppContextProvider>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Navbar />
                        <Component {...pageProps} />
                    </Box>
                </AppContextProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
};

export default App;
