import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AppContextProvider } from "../store/AppContext";
import { AuthContextProvider } from "../store/AuthContext";

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <AppContextProvider>
                    <Component {...pageProps} />
                </AppContextProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
};

export default App;
