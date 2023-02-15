import { Box } from "@mui/material";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import AppThemeProvider from "../components/UI/Theme";
import { AppContextProvider } from "../store/AppContext";
import { AuthContextProvider } from "../store/AuthContext";
import "../styles/globals.css";
import "../styles/normalize.css";

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <AppContextProvider>
                    <AppThemeProvider>
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
                    </AppThemeProvider>
                </AppContextProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
};

export default App;
