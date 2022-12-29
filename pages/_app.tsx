import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default App;
